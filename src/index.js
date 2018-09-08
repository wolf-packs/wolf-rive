/* global test, expect */
const Rivescript = require('rivescript')
const { stages, createWolfStore } = require('botbuilder-wolf')
const { intake, fillSlot, evaluate, execute, outtake } = stages
const startCase = require('lodash.startcase')
const fs = require('fs')

const parseRive = (filePath) => {
  const rive = new Rivescript()
  const content = fs.readFileSync(filePath, 'utf8')
  rive.stream(`
! local concat = newline

${content}`)
  return rive.deparse()
}

const runWolfTests = (riveObj, wolfRunner) => {
  const { topics } = riveObj
  const rawTopicNames = Object.keys(topics)
  const topicNames = rawTopicNames.map(startCase)

  // Need to use for because jest doesn't like dynamically created `test` :(
  for (let i = 0; i < rawTopicNames.length; i++) { 
    const rawName = rawTopicNames[i]
    const testName = topicNames[i]
    test(testName, async () => {
      const storeCreator = createWolfStore()
      const convoState = {}
      const store = storeCreator(null)
      const triggers = topics[rawName]
      // Need to use for because jest doesn't like dynamically created `expect` :(
      for (let j = 0; j < triggers.length; j++) {
        const trigger = triggers[j]
        const { trigger: userMessage, reply } = trigger
        const {messageStringArray: actual} = await wolfRunner(convoState, store, userMessage)
        const expected = reply.map(_ => _.replace(/\\s/g, ' '))
        await expect(actual).toEqual(expected)
      }
    })
  }
}

const createWolfRunner = (
  getMessageData,
  getAbilities,
  defaultAbility
) => async (convoState, store, message) => {
  const nlpResult = await getMessageData(message)
  const abilities = await getAbilities()
  const incomingSlotData = []

  intake(store, nlpResult, incomingSlotData, defaultAbility)
  fillSlot(store, convoState, abilities)
  evaluate(store, abilities, convoState)
  const executeResult = execute(store, convoState, abilities)

  if (executeResult) {
    const { runOnComplete, addMessage } = executeResult
    const messages = await runOnComplete()
    messages.forEach(addMessage)
  }

  return outtake(store)
}

module.exports = {
  parseRive,
  runWolfTests,
  createWolfRunner
}

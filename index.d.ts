import { NlpResult, Ability, OuttakeResult } from 'botbuilder-wolf'
import { Store } from 'redux'

interface RiveAstObject {
  [key: string]: any
}

const WolfRunner = async (
  convoState: Object,
  store: Store,
  message: string
) => OuttakeResult

export const parseRive = (filePath: string) => RiveAstObject

export const createWolfRunner = (
  getMessageData: (message: string) => NlpResult,
  getAbilities: () => Ability[],
  defaultAbility: string
) => WolfRunner

export const runWolfTests = (riveObj: RiveAstObject, wolfRunner: WolfRunner) => undefined

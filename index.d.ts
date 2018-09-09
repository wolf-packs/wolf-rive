import { NlpResult, Ability, OuttakeResult } from 'botbuilder-wolf'
import { Store } from 'redux'

interface RiveAstObject {
  [key: string]: any
}

type WolfRunner = (
  convoState: Object,
  store: Store,
  message: string
) => Promise<OuttakeResult>

type ParseRive = (filePath: string) => RiveAstObject

type CreateWolfRunner = (
  getMessageData: (message: string) => NlpResult,
  getAbilities: () => Ability[],
  defaultAbility: string
) => WolfRunner

type RunWolfTests = (riveObj: RiveAstObject, wolfRunner: WolfRunner) => void

export const parseRive: ParseRive

export const createWolfRunner: CreateWolfRunner

export const runWolfTests: RunWolfTests

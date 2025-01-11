import { MODULE } from '../constants'

export default class Programmer {
    static getProgramsForActor (actorId) {
        return game.actors.get(actorId)?.getFlag(MODULE.ID, MODULE.FLAG)
    }

    static createProgram (actorId, programData) {
        const newProgram = {
            id: foundry.utils.randomID(16),
            actorId,
            ...programData
        }
        const newPrograms = {
            [newProgram.id]: newProgram
        }
        game.actors.get(actorId)?.setFlag(MODULE.ID, MODULE.FLAG, newPrograms)
    }

    static updateProgram (actorId, programId, updateData) {
        const update = {
            [programId]: updateData
        }
        return game.actors.get(actorId)?.setFlag(MODULE.ID, MODULE.FLAG, update)
    }

    static updateActorPrograms (actorId, expandedData) {
        return game.actors.get(actorId)?.setFlag(MODULE.ID, MODULE.FLAG, expandedData)
    }

    static deleteProgram (actorId, programId) {
        const keyDeletion = {
            [`-=${programId}`]: null
        }

        return game.actors.get(actorId)?.setFlag(MODULE.ID, MODULE.FLAG, keyDeletion)
    }
}

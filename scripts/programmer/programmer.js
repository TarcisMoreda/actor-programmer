import { MODULE } from '../constants'

export default class Programmer {
    static getProgramsForActor (actorId) {
        return game.actors.get(actorId)?.getFlag(MODULE.ID, MODULE.FLAG)
    }

    static async createProgram (actorId, programData) {
        const newProgram = {
            id: foundry.utils.randomID(16),
            actorId,
            ...programData
        }
        const newPrograms = {
            [newProgram.id]: newProgram
        }
        await game.actors.get(actorId)?.setFlag(MODULE.ID, MODULE.FLAG, newPrograms)
    }

    static async updateProgram (actorId, programId, updateData) {
        const update = {
            [programId]: updateData
        }
        await game.actors.get(actorId)?.setFlag(MODULE.ID, MODULE.FLAG, update)
    }

    static async updateActorPrograms (actorId, expandedData) {
        await game.actors.get(actorId)?.setFlag(MODULE.ID, MODULE.FLAG, expandedData)
    }

    static async deleteProgram (actorId, programId) {
        const keyDeletion = {
            [`-=${programId}`]: null
        }

        await game.actors.get(actorId)?.setFlag(MODULE.ID, MODULE.FLAG, keyDeletion)
    }
}

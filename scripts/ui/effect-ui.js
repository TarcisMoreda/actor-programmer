import { MODULE } from '../constants'
import { Programmer } from '../programmer/programmer'

export class EffectUI extends FormApplication {
    constructor (options, actor, programId) {
        super(options)
        this.actor = game.actors.get(actor.id ? actor.id : actor._id)
        this.programId = programId
        this.mode = 'number'
    }

    static get defaultOptions () {
        const options = super.defaultOptions
        options.title = `${game.i18n.format('ap.program')} ${game.i18n.format('ap.actor')}`
        options.template = `modules/${MODULE.ID}/templates/effect-ui.hbs`
        options.classes = ['actor-programmer']
        options.id = 'actor-programmer-effect'
        options.width = 400
        options.height = 72
        options.closeOnSubmit = false
        options.submitOnChange = true
        return options
    }

    async getData () {
        return {
            actor: this.actor,
            program: Programmer.getProgramsForActor(this.actor.id)[this.programId]
        }
    }

    async _updateObject (_event, formData) {
        const expandedData = foundry.utils.expandObject(formData)
        await Programmer.updateActorPrograms(this.actor.id, expandedData)
    }
}

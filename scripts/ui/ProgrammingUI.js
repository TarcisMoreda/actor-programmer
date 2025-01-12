import { MODULE } from '../constants'
import Programmer from '../programmer/programmer'

export class ProgrammingUI extends FormApplication {
    constructor (options, actor) {
        super(options)
        this.actor = game.actors.get(actor.id ? actor.id : actor._id)
        this.mode = 'number'
    }

    static get defaultOptions () {
        const options = super.defaultOptions
        options.title = `${game.i18n.format('ap.program')} ${game.i18n.format('ap.actor')}`
        options.template = `modules/${MODULE.ID}/templates/programmingUI.hbs`
        options.classes = ['actor-programmer']
        options.id = 'actor-programmer'
        options.width = 600
        options.height = 700
        options.closeOnSubmit = false
        options.submitOnChange = true
        return options
    }

    async getData () {
        return {
            actor: this.actor,
            programs: Programmer.getProgramsForActor(this.actor.id)
        }
    }

    async _updateObject (_event, formData) {
        const expandedData = foundry.utils.expandObject(formData)
        await Programmer.updateActorPrograms(this.actor.id, expandedData)
    }

    activateListeners (html) {
        super.activateListeners(html)
        html.on('click', '[data-action]', this._handleButtonClick.bind(this))
    }

    async _handleButtonClick (event) {
        const clickedElement = $(event.currentTarget)
        const action = clickedElement.data().action
        const actorId = this.actor.id
        const programId = clickedElement.parents('[data-program-id]')?.data()?.programId

        switch (action) {
        case 'create':
            await Programmer.createProgram(actorId, { arg1: '', arg2: '', op: 'equals', command: '' })
            this.render()
            break

        case 'reset':
            {
                const actorPrograms = Programmer.getProgramsForActor(actorId)
                const keys = Object.keys(actorPrograms)
                for (const key of keys) { await Programmer.deleteProgram(actorId, key) }
            }
            this.render()
            break

        case 'delete':
            await Programmer.deleteProgram(actorId, programId)
            this.render()
            break

        default:
            break
        }
    }
}

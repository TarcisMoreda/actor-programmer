import { MODULE } from '../constants'

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
        options.width = 400
        options.closeOnSubmit = true
        return options
    }

    async getData () {
        return {
            actor: this.actor
        }
    }
}

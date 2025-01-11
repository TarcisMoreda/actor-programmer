import { ProgrammingUI } from '../ui/programmingUI'

export function registerProgramButton () {
    Hooks.on('renderActorSheet', (sheet, html, _css) => {
        if (!game.user.isTrusted) return

        const button = $(`
            <a class="header-button program program-sheet">
                <i class="fas fa-terminal"></i>${game.i18n.format('ap.program')}
            </a>
        `)
        button.click(() => {
            const programmer = new ProgrammingUI(ProgrammingUI.defaultOptions, sheet.actor)
            programmer.render(true, { actor: sheet.actor })
        })

        html.closest('.app').find('.program-sheet').remove()
        const titleElement = html.closest('.app').find('.window-title')
        if (!sheet._minimized) button.insertAfter(titleElement)
    })
}

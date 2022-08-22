const App = {
    data() {
        return {
            dialogPhrases: '',
            phraseSetter: '',
            phraseGen: this.getPhrase(),
            phrase: '',
            buttons: [],
        }
    },
    methods: {
        async getButtons(){
            const dialogButtons = await mp.events.callProc("reciveStarterButtons")
            if (dialogButtons){
                return dialogButtons.split('  ')
            }
        },
        async getPhrases(){
            const dialogPhrases = await mp.events.callProc("reciveStarterDialog")
            return dialogPhrases.split('  ')
        },
        async * getPhrase(){
            for (phrase of await this.getPhrases()){
                yield phrase
            }
        },
        async setPhrase() {
            let content = await this.phraseGen.next()
            if (content.done){ 
                const dialogButtons = await this.getButtons()
                if (dialogButtons){
                    this.buttons = dialogButtons
                    this.phrase = 1
                    clearInterval(this.phraseSetter)
                    mp.trigger("showCursor", true)
                } else {
                    mp.trigger('closeStarterDialog')
                }
            }
            this.phrase = await content.value
        },
        clickCallbackButton(event){
            mp.trigger("showCursor", false)
            mp.trigger("buttonCallback:"+event.target.innerText)
            mp.trigger("closeStarterDialog")
        }
    },   
    async mounted() {
        const phrase = await this.phraseGen.next()
        this.phrase = phrase.value
        this.phraseSetter = setInterval(async () => {
            await this.setPhrase()
        },5000)
    },
}

Vue.createApp(App).mount('#app')
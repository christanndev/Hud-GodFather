const userHud = new Vue({
    el: ".HudBase",
    data: {
        active: false,
        zoom: 1,
        safezone: {
            active: true,
        },
    },

    mounted() {
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
        window.addEventListener("message", this.onMessage);
    },

    methods: {
        async post(url, data = {}) {
            try {
                const response = await fetch(`https://${GetParentResourceName()}/${url}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            
                if (response.ok) {
                    return await response.json();
                } else {
                    throw new Error(`${response.status}`);
                }
            } catch (error) {
                return null;
            }
        },

        handleResize() {
            var zoomCountOne = window['innerWidth'] / 1920;
            var zoomCountTwo = window['innerHeight'] / 1080;

            if (zoomCountOne < zoomCountTwo) {
                this['zoom'] = zoomCountOne;
            } else {
                this['zoom'] = zoomCountTwo;
            }
        },

        onMessage() {
            var data = event.data

            switch (data.act) {
                case "updateHud":
            
                break

                case 'updateSafezone': 
                    case 'closeSafezone':
                        $(".SafeZone").addClass("Close")
                        setTimeout(() => {
                            $(".SafeZone").removeClass("Close")
                            this.safezone.active = false
                        }, 290);
                    break
                break
            }
        }
    }
});

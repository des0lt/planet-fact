fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        class Planet {
            constructor(data) {
                this.name = data.name;
                this.overview = data.overview;
                this.structure = data.structure;
                this.geology = data.geology;
                this.rotation = data.rotation;
                this.revolution = data.revolution;
                this.radius = data.radius;
                this.temperature = data.temperature;
                this.images = data.images;
            }

            switchImg(i) {
                const pictures = document.querySelectorAll('.picture div');
                pictures.forEach(picture => {
                    picture.classList.remove('active');
                    if (i === 2) {
                        pictures[0].classList.add('active');
                        pictures[2].classList.add('active');
                    } else {
                        pictures[i].classList.add('active');
                    }
                })
            }

            changeImg() {
                const pictures = document.querySelector('.picture');
                pictures.innerHTML = `
                    <div class="planet active" style="background-image: url('${this.images.planet}');"></div>
                    <div class="planet-internal" style="background-image: url('${this.images.internal}');"></div>
                    <div class="geology" style="background-image: url('${this.images.geology}');"></div>
                `
            }

            changeName() {
                const nameId = document.querySelector('#name');
                nameId.innerHTML = this.name;
            }

            switchText(i) {
                const descrText = document.querySelectorAll('.descr-text');
                chooseActive(descrText, i);
            }

            changeText() {
                const descrText = document.querySelectorAll('.descr-text');
                
                descrText[0].innerHTML = this.overview.content;
                descrText[1].innerHTML = this.structure.content;
                descrText[2].innerHTML = this.geology.content;
            }

            switchLink(i) {
                const links = document.querySelectorAll('.wiki-link');
                chooseActive(links, i);
            }

            changeLink() {
                const source = document.querySelector('.source');

                source.innerHTML = `
                    <span>Source: </span>
                    <a href="${this.overview.source}" target="_blank" class="league-spartan-h3 wiki-link active">Wikipedia</a>
                    <a href="${this.structure.source}" target="_blank" class="league-spartan-h3 wiki-link">Wikipedia</a>
                    <a href="${this.geology.source}" target="_blank" class="league-spartan-h3 wiki-link">Wikipedia</a>
                `;
            }

            changeCharacteristics() {
                const rotation = document.querySelector('#rotation'),
                      revolution = document.querySelector('#revolution'),
                      radius = document.querySelector('#radius'),
                      temperature = document.querySelector('#temperature');

                rotation.innerHTML = this.rotation;
                revolution.innerHTML = this.revolution;
                radius.innerHTML = this.radius;
                temperature.innerHTML = this.temperature;
            }
            render() {
                const parent = document.querySelector('main');
                parent.innerHTML = `
                <div class="planet-illustration">
                    <div class="picture"></div>
                    <div class="descr">
                        <div class="text-wrapp">
                            <h1 class="antonio-medium-h1" id="name"></h1>
                            <p class="descr-text league-spartan-body active"></p>
                            <p class="descr-text league-spartan-body"></p>
                            <p class="descr-text league-spartan-body"></p>
                            <div class="source league-spartan-body"></div>
                        </div>
                        <div class="buttons-wrap">
                            <button class="league-spartan-h3 active">
                                <span>01</span>
                                <h3>overview</h3>
                            </button>
                            <button class="league-spartan-h3">
                                <span>02</span>
                                <h3>Internal Structure</h3>
                            </button>
                            <button class="league-spartan-h3">
                                <span>02</span>
                                <h3>Surface Geology</h3>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="planet-characteristics">
                    <div class="characteristics_wrap">
                        <h4 class="league-spartan-h4">ROTATION TIME</h4>
                        <h2 class="antonio-medium-h2" id="rotation"></h2>
                    </div>
                    <div class="characteristics_wrap">
                        <h4 class="league-spartan-h4">REVOLUTION TIME</h4>
                        <h2 class="antonio-medium-h2" id="revolution"></h2>
                    </div>
                    <div class="characteristics_wrap">
                        <h4 class="league-spartan-h4">radius</h4>
                        <h2 class="antonio-medium-h2" id="radius"></h2>
                    </div>
                    <div class="characteristics_wrap">
                        <h4 class="league-spartan-h4">AVERAGE TEMP.</h4>
                        <h2 class="antonio-medium-h2" id="temperature"></h2>
                    </div>
                </div>
                `;
            }
        }
    
    const navBar = document.querySelectorAll('nav a');

    mainColors = ['var(--light-blue)', 'var(--yellow)', 'var(--purple)', 'var(--brown)', 'var(--red)', 'var(--orange)', 'var(--green)', 'var(--blue)']

    navBar.forEach((element, i) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.documentElement.style.setProperty('--main-color', mainColors[i]);
            targetActive(navBar, e);

            const planet = new Planet(data[i]);
            const switchBtns = document.querySelectorAll('.buttons-wrap button');
            planet.changeName();
            planet.changeText();
            planet.changeImg();
            planet.switchLink(0);
            planet.switchText(0);
            planet.switchImg(0);
            planet.changeLink();
            planet.changeCharacteristics();
            chooseActive(switchBtns, 0)
        })
    })

    function chooseActive(parent, id) {
        parent.forEach(element => {
            element.classList.remove('active');
            parent[id].classList.add('active');
        })
    }

    function targetActive(parent, e) {
        parent.forEach(element => element.classList.remove('active'));
        e.target.classList.add('active');
    }


    function attachSwitchListeners() {
        const switchBtns = document.querySelectorAll('.buttons-wrap button');
        
        switchBtns.forEach((element, i) => {
            element.addEventListener('click', (e) => {
                targetActive(switchBtns, e)

                const planet = new Planet(data[i]);
                planet.switchText(i);
                planet.switchImg(i);
                planet.switchLink(i);
            });
        });
    }
    
    const planet = new Planet(data[0]);
    
    planet.render();
    planet.changeName();
    planet.changeText();
    planet.changeImg();
    planet.changeLink();
    planet.changeCharacteristics();
    attachSwitchListeners(planet)
      
    })
    .catch(err => document.querySelector('main').innerHTML = `
        <div id="error-text">
            <h1 class="antonio-medium-h1">Сталася помилка, спробуйте оновити сторінку<h1><br>
            <span class="league-spartan-h3">${err}<span>
        </div>
    `
);

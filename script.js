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

            render() {
                const parent = document.querySelector('main');
                parent.innerHTML = `
                <div class="planet-illustration">
                    <div class="picture">
                        <div class="planet active" style="background-image: url('${this.images.planet}');"></div>
                        <div class="planet-internal" style="background-image: url('${this.images.internal}');"></div>
                        <div class="geology" style="background-image: url('${this.images.geology}');"></div>
                    </div>
                    <div class="descr">
                        <h1 class="antonio-medium-h1">${this.name}</h1>
                        <p class="descr-text league-spartan-body active">${this.overview.content}</p>
                        <p class="descr-text league-spartan-body">${this.structure.content}</p>
                        <p class="descr-text league-spartan-body">${this.geology.content}</p>
                        <div class="source league-spartan-body">
                            <span>Source: </span>
                            <a href="${this.overview.source}" class="league-spartan-h3 wiki-link active">Wikipedia</a>
                            <a href="${this.structure.source}" class="league-spartan-h3 wiki-link">Wikipedia</a>
                            <a href="${this.geology.source}" class="league-spartan-h3 wiki-link">Wikipedia</a>
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
                        <h2 class="antonio-medium-h2">${this.rotation}</h2>
                    </div>
                    <div class="characteristics_wrap">
                        <h4 class="league-spartan-h4">REVOLUTION TIME</h4>
                        <h2 class="antonio-medium-h2">${this.revolution}</h2>
                    </div>
                    <div class="characteristics_wrap">
                        <h4 class="league-spartan-h4">radius</h4>
                        <h2 class="antonio-medium-h2">${this.radius}</h2>
                    </div>
                    <div class="characteristics_wrap">
                        <h4 class="league-spartan-h4">AVERAGE TEMP.</h4>
                        <h2 class="antonio-medium-h2">${this.temperature}</h2>
                    </div>
                </div>
                `
            }
        }
    
    const navBar = document.querySelectorAll('nav a');

    mainColors = ['var(--light-blue)', 'var(--yellow)', 'var(--purple)', 'var(--brown)', 'var(--red)', 'var(--orange)', 'var(--green)', 'var(--blue)']

    navBar.forEach((element, i) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.documentElement.style.setProperty('--main-color', mainColors[i]);

            navBar.forEach(element => {
                element.classList.remove('active');
            })
            e.target.classList.add('active');

            new Planet(data[i]).render();
            attachSwitchListeners();
        })
    })

    // console.log(navBar)

    // console.log(new Planet(data[1]))

    function switchContent(e, asd) {
        switchBtns.forEach(element => {
            element.classList.remove('active');
            e.target.classList.add('active');
        })
    }


    function attachSwitchListeners() {
        const switchBtns = document.querySelectorAll('.buttons-wrap button');
        const pictures = document.querySelectorAll('.picture div');
        const switchText = document.querySelectorAll('.descr-text');
        const links = document.querySelectorAll('.wiki-link')
        switchBtns.forEach((element, i) => {
            element.addEventListener('click', (e) => {
                switchBtns.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                pictures.forEach(picture => {
                    picture.classList.remove('active');
                    console.log(i)
                    if (i === 2) {
                        pictures[0].classList.add('active');
                        pictures[2].classList.add('active');
                    } else {
                        pictures[i].classList.add('active');
                    }
                })

                switchText.forEach(text => {
                    text.classList.remove('active');
                    switchText[i].classList.add('active');
                })

                links.forEach(link => {
                    link.classList.remove('active');
                    links[i].classList.add('active');
                })
            });
        });
    }
    
    new Planet(data[0]).render();
    attachSwitchListeners()
      
  })
  .catch(err => console.error('Ошибка загрузки данных:', err));

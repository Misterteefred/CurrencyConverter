const elDivFrom  = document.querySelector('.divFrom');
const elDivInputFrom  = document.querySelector('.divInputFrom');
const elInputFrom  = document.querySelector('.inputFrom');
const elListeFrom  = document.querySelector('.listeFrom');
const elUlListeFrom  = document.querySelector('.ulListeFrom');
const elListeFromSearch  = document.querySelector('.listeFromSearch');
const elUlListeFromSearch  = document.querySelector('.ulListeFromSearch');
const elBoutonSelectFrom  = document.querySelector('.boutonselectFrom');
const elDivTo  = document.querySelector('.divTo');
const elDivInputTo = document.querySelector('.divInputTo');
const elInputTo  = document.querySelector('.inputTo');
const elListeTo  = document.querySelector('.listeTo');
const elUlListeTo  = document.querySelector('.ulListeTo');
const elListeToSearch  = document.querySelector('.listeToSearch');
const elUlListeToSearch  = document.querySelector('.ulListeToSearch');
const elBoutonSelectTo  = document.querySelector('.boutonselectTo');
const elBoutonInverser = document.querySelectorAll('.boutonInverser');
const elButtonConvert = document.querySelector('.buttonConvert');
const elDivResultat = document.querySelector('.divResultat');
const elInputMontant = document.querySelector('.inputMontant');
const elpFrom = document.querySelector('.pFrom');
const elpTo = document.querySelector('.pTo');
const elTxFrom = document.querySelector('.txFrom');
const elTxTo = document.querySelector('.txTo');


document.addEventListener("DOMContentLoaded", creerListe);

elUlListeFrom.addEventListener('mousedown', selectionMonnaie);
elUlListeFromSearch.addEventListener('mousedown', selectionMonnaie);
elUlListeTo.addEventListener('mousedown', selectionMonnaie);
elUlListeToSearch.addEventListener('mousedown', selectionMonnaie);
elInputFrom.addEventListener('keyup', monnaieRechercheFrom);
elInputTo.addEventListener('keyup', monnaieRechercheTo);

elBoutonSelectFrom.addEventListener('click', afficherListe);
elDivFrom.addEventListener('click', afficherListe);
elBoutonSelectTo.addEventListener('click', afficherListe);
elDivTo.addEventListener('click', afficherListe);

elInputFrom.addEventListener('blur', masquerListe);
elInputTo.addEventListener('blur', masquerListe);
elInputFrom.addEventListener('blur', masquerListesearch);
elInputTo.addEventListener('blur', masquerListesearch);

elButtonConvert.addEventListener('click', convertir);
elBoutonInverser.forEach(bouton => {bouton.addEventListener('click', inverser)});

//On récupère les données de l'API pour construire la liste dans le DOM
const apiKey = '1b25797800c87f0687443145'
function creerListe(){
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`)
    .then(response => response.json())
    .then(result => { 
        console.log(result)
        let liste = result.conversion_rates
        Object.keys(liste).forEach(codeMonnaie => {
            //pour la div "from"
            const divLiFrom = document.createElement('div')  
            const elLiFrom = document.createElement('li')
            elLiFrom.classList.add('liFrom')
            elLiFrom.textContent = codeMonnaie
            elLiFrom.style.listStyleImage = `url(/drapeaux/${codeMonnaie}.jpg)`; 
            divLiFrom.append(elLiFrom)
            //pour la div "to"
            const divLiTo = document.createElement('div')  
            const elLiTo = document.createElement('li')
            elLiTo.classList.add('liTo')
            elLiTo.textContent = codeMonnaie
            elLiTo.style.listStyleImage = `url(/drapeaux/${codeMonnaie}.jpg)`;
            divLiTo.append(elLiTo)             
            //on injecte les deux :
            elUlListeFrom.append(divLiFrom)
            elUlListeTo.append(divLiTo)               
        });
    })
    .catch(error => console.log('error', error));
}

//Si on focus sur "from" ou "To" alors on affiche la liste des monnaies
function afficherListe(e){ 
    e.preventDefault()   
    if(e.target.classList.contains('divFrom') || e.target.classList.contains('boutonselectFrom')){
        elDivFrom.classList.add('divHide')
        elDivInputFrom.classList.add('divInputVisible')  
        elListeFrom.classList.add('listeVisible')
        elInputFrom.focus()                 
    }if(e.target.classList.contains('divTo') || e.target.classList.contains('boutonselectTo')){        
        elDivTo.classList.add('divHide')
        elDivInputTo.classList.add('divInputVisible')
        elListeTo.classList.add('listeVisible')
        elInputTo.focus()                      
    }   
}

//Si on perd le focus depuis "from" ou "To" ou clic sur les boutons "croix" alors on masque la liste des monnaies
function masquerListe(e){ 
    e.preventDefault()
    if(e.target.classList.contains('inputFrom')){   
        elDivFrom.classList.remove('divHide')
        elDivInputFrom.classList.remove('divInputVisible')
        //animation         
        elListeFrom.classList.add('animate__fadeOut');
        setTimeout(function(){
            elListeFrom.classList.remove('listeVisible');
            elListeFrom.classList.remove('animate__fadeOut');
        }, 500)
        
    }
    if(e.target.classList.contains('inputTo')){
        elDivTo.classList.remove('divHide')
        elDivInputTo.classList.remove('divInputVisible')
        //animation         
        elListeTo.classList.add('animate__fadeOut');
        setTimeout(function(){
            elListeTo.classList.remove('listeVisible');
            elListeTo.classList.remove('animate__fadeOut');
        }, 500)
        
    }
}

function masquerListesearch(e){
    if(e.target.classList.contains('inputFrom')){
        //animation
        elListeFromSearch.classList.add('animate__fadeOut');        
        setTimeout(function(){
            elListeFromSearch.classList.remove('listeVisible')
            elListeFromSearch.classList.remove('animate__fadeOut');
        }, 300)
        e.target.value=''
    }
    if(e.target.classList.contains('inputTo')){
        //animation
        elListeToSearch.classList.add('animate__fadeOut');  
        setTimeout(function(){
            elListeToSearch.classList.remove('listeVisible')
            elListeToSearch.classList.remove('animate__fadeOut');
        }, 300)
        
        e.target.value=''
    }
}

//Pour selectionner une monnaie depuis la liste
function selectionMonnaie(e){
    if(e.target.classList.contains('liFrom')){
        elDivFrom.firstElementChild.remove()
        const liClone = e.target.cloneNode(true);   
        elDivFrom.prepend(liClone); 
        elDivFrom.firstElementChild.classList.replace('liFrom','liDivFrom');
    }
    if(e.target.classList.contains('liTo')){
        elDivTo.firstElementChild.remove()
        const liClone = e.target.cloneNode(true);   
        elDivTo.prepend(liClone); 
        elDivTo.firstElementChild.classList.replace('liTo', 
        'liDivTo'); 
    }
}


function inverser(e){
    e.preventDefault()   
    //clonage du "From" et du "To"
    const elDivFromClone = elDivFrom.firstElementChild.cloneNode(true);
    const elDivToClone = elDivTo.firstElementChild.cloneNode(true);
    //je suprrime les éléments cloné
    elDivFrom.firstElementChild.remove()
    elDivTo.firstElementChild.remove()
    //je les ajoute au DOM
    elDivFrom.prepend(elDivToClone);
    elDivTo.prepend(elDivFromClone);
}

function monnaieRechercheFrom(){     
    let valInput = elInputFrom.value   
    //si l'input contient un caractère à rechercher :
    if (valInput !== ''){            
        elUlListeFromSearch.innerHTML = ''
        elListeFromSearch.classList.add('listeVisible')
        elListeFrom.classList.remove('listeVisible')
        // elListeFrom.classList.remove('listeVisible')    

        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`)
        .then(response => response.json())
        .then(result => { 

            let tabCodeMonnaieTrouve = matchRecherche(result, valInput)

            tabCodeMonnaieTrouve.forEach(code=>{  
                const divLiFrom = document.createElement('div')
                const elLi = document.createElement('li')
                elLi.classList.add('liFrom')
                elLi.textContent = code
                elLi.style.listStyleImage = `url(/drapeaux/${code}.jpg)`;
                divLiFrom.append(elLi)
                elUlListeFromSearch.append(divLiFrom)        
            });
        })
        .catch(error => console.log('error', error));
    }
}
//ok
function monnaieRechercheTo(){ 
    let valInput = elInputTo.value      
    //si l'input contient un caractère à rechercher :
    if (valInput !== ''){            
        elUlListeToSearch.innerHTML = ''
        elListeToSearch.classList.add('listeVisible')
        elListeTo.classList.remove('listeVisible')
        // elListeFrom.classList.remove('listeVisible')
    
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`)
        .then(response => response.json())
        .then(result => { 
               
            let tabCodeMonnaieTrouve = matchRecherche(result, valInput)
            
            tabCodeMonnaieTrouve.forEach(code=>{        
                const divLiTo = document.createElement('div')
                const elLi = document.createElement('li')
                elLi.classList.add('liTo')
                elLi.textContent = code
                elLi.style.listStyleImage = `url(/drapeaux/${code}.jpg)`;    
                divLiTo.append(elLi)        
                elUlListeToSearch.append(divLiTo)          
            });
        })
        .catch(error => console.log('error', error));        
    }
}

function  matchRecherche(result, valInput){
    let liste = result.conversion_rates
    //je crée un tableau des clés de l'objet "liste" pour que la fonction "autoComplete" puisse filtrer.
    let tabCodeMonnaie = []
    Object.keys(liste).forEach(codeMonnaie => {
        tabCodeMonnaie.push(codeMonnaie)            
    });        
    // cette fonction génère un nouveau tableau contenant les éléments du "tabCodeMonnaie" incluant la valeur de l'input
    function autoComplete(tabCodeMonnaie, Input) {
        return tabCodeMonnaie.filter(e =>e.toLowerCase().includes(Input.toLowerCase()));
    }            
    let tabCodeMonnaieTrouve = autoComplete(tabCodeMonnaie,valInput);
    return tabCodeMonnaieTrouve
}

//ok
function convertir(e){
    e.preventDefault()
    const deviseDepart = elDivFrom.firstElementChild.textContent
    const deviseArrive = elDivTo.firstElementChild.textContent
    const montant = elInputMontant.value

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${deviseDepart}/${deviseArrive}/${montant}`)
    .then(response => response.json())
    .then(result => { 
        
        let conversion = result.conversion_result
        elpFrom.textContent = `${montant} ${deviseDepart} = `
        elpTo.textContent = `${conversion} ${deviseArrive}`
    })
    .catch(error => console.log('error', error));
    if (montant > 1){
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${deviseDepart}/${deviseArrive}/1`)
        .then(response => response.json())
        .then(result => { 
            
            let conversion = result.conversion_result
            elTxFrom.textContent = `1 ${deviseDepart} =   ${conversion} ${deviseArrive}`
        })
        .catch(error => console.log('error', error));
    }
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${deviseArrive}/${deviseDepart}/1`)
    .then(response => response.json())
    .then(result => { 
        
        let conversion = result.conversion_result
        elTxTo.textContent = `1 ${deviseArrive} = ${conversion} ${deviseDepart}`
    })
    .catch(error => console.log('error', error));

}

//CODE par Damien Hubleur

let numberOfActions;
let Apoints = 0;
let Bpoints = 0;
let currentState;
let states;
let actionTime;
let canvas;
let ctx;

let matchs;
let Awin = 0;
let Bwin = 0;

function loadDrawing(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1A8507";
    ctx.fillRect(0, 0, 200, 150);

    ctx.fillStyle = "#0945FF";
    ctx.fillRect(0, 60, 5, 30);

    ctx.fillStyle = "#FC0202";
    ctx.fillRect(195, 60, 5, 30);

    ctx.fillStyle = "#fefefe";
    ctx.beginPath();
    ctx.arc(100, 75, 10, 0, Math.PI * 2);
    ctx.fill();
}

$('#start').click( function( e ) {
    e.preventDefault();

    $("html, body").animate({scrollTop: $(document).height()}, 0.001);

    actionTime = $("#timeBetweenActions").val();
    numberOfActions = $( "#numberOfActions").val();
    matchs = $( "#numberOfMatches").val();

    const A = {
        draw: function(){
            ctx.fillStyle = "#1A8507";
            ctx.fillRect(0, 0, 200, 150);

            ctx.fillStyle = "#0945FF";
            ctx.fillRect(0, 60, 5, 30);

            ctx.fillStyle = "#FC0202";
            ctx.fillRect(195, 60, 5, 30);

            ctx.fillStyle = "#0945FF";
            ctx.beginPath();
            ctx.arc(120, 75, 10, 0, Math.PI * 2);
            ctx.fill();
        },
        name: "A",
        phrase: "A récupère la balle",
        probas: [
            {
                name: "A",
                proba: $( "#AtoA").val()
            },
            {
                name: "B",
                proba: $( "#AtoB").val()
            },
            {
                name: "GA",
                proba: $( "#AtoGA").val()
            },
            {
                name: "GB",
                proba: $( "#AtoGB").val()
            }
        ],
    };

    const B = {

        draw: function(){
            ctx.scale(1, 1);
            ctx.fillStyle = "#1A8507";
            ctx.fillRect(0, 0, 200, 150);

            ctx.fillStyle = "#0945FF";
            ctx.fillRect(0, 60, 5, 30);

            ctx.fillStyle = "#FC0202";
            ctx.fillRect(195, 60, 5, 30);

            ctx.fillStyle = "#FC0202";
            ctx.beginPath();
            ctx.arc(80, 75, 10, 0, Math.PI * 2);
            ctx.fill();
        },
        name: "B",
        phrase: "B récupère la balle",
        probas: [
            {
                name: "B",
                proba: $( "#BtoB").val()
            },
            {
                name: "A",
                proba: $( "#BtoA").val()
            },
            {
                name: "GB",
                proba: $( "#BtoGB").val()
            },
            {
                name: "GA",
                proba: $( "#BtoGA").val()
            }
        ]
    };
    const GA = {
        draw: function(){
            ctx.scale(1, 1);
            ctx.fillStyle = "#1A8507";
            ctx.fillRect(0, 0, 200, 150);

            ctx.fillStyle = "#0945FF";
            ctx.fillRect(0, 60, 5, 30);

            ctx.fillStyle = "#FC0202";
            ctx.fillRect(195, 60, 5, 30);

            ctx.fillStyle = "#fefefe";
            ctx.beginPath();
            ctx.arc(10, 75, 10, 0, Math.PI * 2);
            ctx.fill();
        },
        name: "GA",
        phrase: "Goal de l'équipe A !!! Remise en jeu",
        probas: [
            {
                name: "A",
                proba: $( "#toA").val()
            },
            {
                name: "B",
                proba: $("#toB").val()
            }
        ]
    };
    const GB = {
        draw: function(){
            ctx.scale(1, 1);
            ctx.fillStyle = "#1A8507";
            ctx.fillRect(0, 0, 200, 150);

            ctx.fillStyle = "#0945FF";
            ctx.fillRect(0, 60, 5, 30);

            ctx.fillStyle = "#FC0202";
            ctx.fillRect(195, 60, 5, 30);

            ctx.fillStyle = "#fefefe";
            ctx.beginPath();
            ctx.arc(190, 75, 10, 0, Math.PI * 2);
            ctx.fill();
        },
        name: "GB",
        phrase: "Goal de l'équipe B !!! Remise en jeu",
        probas: [
            {
                name: "A",
                proba: $( "#toA").val()
            },
            {
                name: "B",
                proba: $("#toB").val()
            }
        ]
    };

    states = [A, B, GA, GB];

    append("Début du match");



    const probaA ={
        name: "A",
        start: 0,
        end: $( "#toA").val()
    };
    const probaB ={
        name: "B",
        start: parseInt($( "#toA").val()) + 1,
        end: 100
    };
    const startProbas = [probaA, probaB];

    const random = randomIntFromInterval(0, 100);

    for(const id in startProbas){
        let startProba = startProbas[id];
        if(random >= startProba.start && random <= startProba.end){
            for(const id2 in states){
                let state = states[id2];
                if(state.name === startProba.name){
                    currentState = state;
                    break;
                }
            }
        }
    }

    append(currentState.phrase);

    action();
});

function action(){
    if(matchs > 0) {
        if (numberOfActions > 0) {
            numberOfActions = numberOfActions - 1;
            currentState = getNextState(currentState);
            append(currentState.phrase);
            currentState.draw();
            if (currentState.name === "GA") {
                Apoints = Apoints + 1;
                append("---- SCORES ----");
                append("A: " + Apoints);
                append("B: " + Bpoints);
                append("----------------");
            }
            if (currentState.name === "GB") {
                Bpoints = Bpoints + 1;
                append("---- SCORES ----");
                append("A: " + Apoints);
                append("B: " + Bpoints);
                append("----------------");
            }
            setTimeout(() => {
                action()
            }, actionTime);
        } else {
            append("===============================");
            append("Fin du match !");
            append("---- SCORES ----");
            append("A: " + Apoints);
            append("B: " + Bpoints);
            append("----------------");
            if (Apoints === Bpoints) {
                append("EGALITE !!!")
            } else {
                if (Apoints > Bpoints) {
                    append("Victoire de l'équipe A !!!");
                    Awin = Awin + 1;
                } else {
                    append("Victoire de l'équipe B !!!");
                    Bwin = Bwin + 1;
                }
            }
            matchs = matchs - 1;
            ctx.fillStyle = "#1A8507";
            ctx.fillRect(0, 0, 200, 150);

            ctx.fillStyle = "#0945FF";
            ctx.fillRect(0, 60, 5, 30);

            ctx.fillStyle = "#FC0202";
            ctx.fillRect(195, 60, 5, 30);

            ctx.fillStyle = "#fefefe";
            ctx.beginPath();
            ctx.arc(100, 75, 10, 0, Math.PI * 2);
            ctx.fill();
            if(matchs > 0){
                append("===== Début d'un nouveau match =====");
                Apoints = 0;
                Bpoints = 0;
                numberOfActions = $( "#numberOfActions").val();
                setTimeout(() => {
                    action()
                }, actionTime);
            }else{
                append("===== Statistiques globales =====");
                append("A a gagné " + Awin + " matches");
                append("B a gagné " + Bwin + " matches");
            }
        }
    }
}

function append(text) {
    $( "#match" ).append( "<p>" + text + "</p>" );

    if($("#follow").is(":checked")) {
        $("html, body").animate({scrollTop: $(document).height()}, 0.001);
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getNextState(state) {
    let probas = [];

    let start = 0;
    let end = 0;
    for(const id in state.probas){
        const possiblyNextState = state.probas[id];
        probas.push({
            name: possiblyNextState.name,
            start: parseInt(start),
            end: parseInt(start) + parseInt(possiblyNextState.proba)
        });
        end = parseInt(start) + parseInt(possiblyNextState.proba);
        start = parseInt(start) + parseInt(possiblyNextState.proba) + 1;
    }

    const random = randomIntFromInterval(0, end);

    for(const id in probas){
        let proba = probas[id];
        if(random >= proba.start && random <= proba.end){
            for(const id2 in states){
                let stateNext = states[id2];
                if(stateNext.name === proba.name){
                    return stateNext;
                }
            }
        }
    }

}
const offer = {};

const answer = {};

export function getOffer() {
    return offer;
}

export function getAnswer() {
    return answer;
}

export function addOffer(newOffer) {
    if (newOffer) {
        offer = newOffer;
        return true;
    }
}

export function addAnswer(newAnswer) {
    if (newAnswer) {
        answer = newAnswer;
        return true;
    }
}
export const restartGameStorage = () =>{
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}

export const saveGameStorage = ( { b, t } ) =>{
    window.localStorage.setItem('board', JSON.stringify(b))
    window.localStorage.setItem('turn', JSON.stringify(t))
}
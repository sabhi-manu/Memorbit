


export  function getInitialsLater (name){
    if(!name) return "AB"

    const word = name.split(" ")
    console.log(word)
    let initials =""

    for(let i=0;i<Math.min(word.length,2);i++){
        initials+=  word[i][0]
    }

    return initials.toUpperCase()
}
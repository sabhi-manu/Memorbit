


export  function getInitialsLater (name){
    if(!name) return "AB"

    const word = name.split(" ")
    // console.log(word)
    let initials =""

    for(let i=0;i<Math.min(word.length,2);i++){
        initials+=  word[i][0]
    }

    return initials.toUpperCase()
}


export const getEmptyCardMessage = (filterType)=>{
    switch (filterType) {
        case 'search':
            return `Oops ! NO Stories found Matching your Search.`
           
        case 'date':
            return `No Stories found in the given Date Range`
    
        default:
            return ` You haven't added any travel stories yet.
        Start documenting your adventures and create your first travel story!`
    }
}


function genrateId()
{
    let i=1;
    return function getIdGenerator()
    {
        return i++;
    }
}


const getId = genrateId();
export { getId };
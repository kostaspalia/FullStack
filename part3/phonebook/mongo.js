const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length<3){
    console.log('Provide more arguments')
    process.exit(1)
}
console.log(process.argv.length)
if(process.argv.length==3){
    
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
        process.exit(1)
    })
    
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.tbxqkjf.mongodb.net/?retryWrites=true&w=majority`



mongoose.connect(url).then((result)=>{
    console.log('connected')
    console.log(process.argv[4])
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    return person.save()
}).then(() => {
    console.log('added ',process.argv[3],' number ',process.argv[4],' to phonebook')
    return mongoose.connection.close()
}).catch((err) => console.log(err))
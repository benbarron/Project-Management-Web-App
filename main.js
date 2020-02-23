const fs = require('fs')
const path = require('path')

var lines = 0
const arr = []

const readDirectory = (dir) => {
	var contents = fs.readdirSync(dir)

	for(let i = 0; i < contents.length; i++) {
		var stat = fs.lstatSync(contents[i])

		if(stat.isDirectory()) {
			readDirectory(path.resolve(dir, contents[i]))

		} else {
			// var fileContent = fs.readFileSync(path.resolve(dir, contents[i]))

			// lines += fileContent.split('\n').length

			arr.push(path.resolve(dir, contents[i]))
		}
	}

}

const start = path.resolve(__dirname)

console.log(start)

readDirectory(start)
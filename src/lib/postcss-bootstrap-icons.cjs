const { cpSync, existsSync } = require('fs')

module.exports = () => {

	return {
		postcssPlugin: 'postcss-bootstrap-icons',

		AtRule: {
            icon: node => {
				const [ key, name ] = node.params.trim().split(/\s+/);
                const inputPath = `node_modules/bootstrap-icons/icons/${name}.svg`
                const outputFile = `${key}-${name}.svg`;
				const outputDir = './public/icons'
				const outputPath = `${outputDir}/${outputFile}`
				if(!existsSync(outputPath)) cpSync(inputPath, outputPath)
				node.replaceWith(`background-image: url(icons/${outputFile})`);
            }
		}
	}
}

module.exports.postcss = true


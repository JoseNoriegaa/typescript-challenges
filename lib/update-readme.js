const fs = require('fs')
const path = require('path')

const REPO_URL = require('../package.json').repository.url
const SRC = path.join(__dirname, '../src')

const listSolvedProblems = (folder) => {
  const files = fs.readdirSync(folder, { encoding: 'utf-8' })

  return files.filter(x => x !== '.gitkeep' && !x.endsWith('todo.ts'))
}

const gatherProblemsByLevel = () => {
  const levels = fs.readdirSync(SRC, { encoding: 'utf-8' })

  return levels.map((level) => ({
    level,
    problems: listSolvedProblems(path.join(SRC, level))
  }))
}

const problems = gatherProblemsByLevel()

const humanize = (value) => {
  return value
    .replace(/-/g, ' ')
    .split('')
    .map((char, idx) => idx === 0 ? char.toUpperCase() : char)
    .join('')
}

const getProblemName = (filename) => {
  const match = /^[0-9]{1,}-(.*)\.ts/.exec(filename) || []
  return humanize(match[1] ?? filename)
}

const getLevelName = (value) => {
  const match = /^[0-9]{1,}-(.*)/.exec(value) || []
  return humanize(match[1] ?? value)
}

const template = problems.reduce((t, item) => {
  if (item.problems.length === 0) return t

  const problemsTemplate = item
    .problems
    .sort((a, b) => {
      const aNumber = a.split('-')[0].padStart(5, '0')
      const bNumber = b.split('-')[0].padStart(5, '0')

      return aNumber - bNumber
    })
    .map(problem => `- [${getProblemName(problem)}](${REPO_URL}/blob/main/src/${item.level}/${problem})`)
    .join('\n')

  return t + `
### ${humanize(getLevelName(item.level))}

${problemsTemplate}
`
}, '\n## Problems\n')

const README_LINES = fs.readFileSync(path.join(__dirname, '../README.md'), { encoding: 'utf8' }).split('\n')

const README_HEADER = README_LINES.slice(0, README_LINES.findIndex(value => value === '## Problems')).join('\n')

const NEW_README = README_HEADER + template

fs.writeFileSync(path.join(__dirname, '../README.md'), NEW_README, { encoding: 'utf-8' })

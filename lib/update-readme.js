const fs = require('fs')
const path = require('path')

const REPO_URL = require('../package.json').repository.url
const SRC = path.join(__dirname, '../src')

const listProblems = (folder) => {
  const files = fs.readdirSync(folder, { encoding: 'utf-8' })

  return files.filter(x => x !== '.gitkeep')
}

const gatherProblemsByLevel = () => {
  const levels = fs.readdirSync(SRC, { encoding: 'utf-8' })

  return levels.map((level) => {
    const problems = listProblems(path.join(SRC, level))
    const solvedProblems = problems.filter(x => !x.endsWith('.todo.ts'))
    const unsolvedProblems = problems.filter(x => x.endsWith('.todo.ts'))

    return {
      level,
      solvedProblems,
      unsolvedProblems
    }
  })
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

const totalUnsolved = problems.reduce((sum, item) => sum + item.unsolvedProblems.length, 0)
const totalSolved = problems.reduce((sum, item) => sum + item.solvedProblems.length, 0)
const totalProblems = totalUnsolved + totalSolved

const problemsHeader = `\n## Problems (${totalSolved}/${totalSolved})${totalSolved === totalProblems ? ' ✅\n' : '\n'}`

const template = problems.reduce((t, item) => {
  if (item.solvedProblems.length === 0) return t

  const problemsTemplate = item
    .solvedProblems
    .sort((a, b) => {
      const aNumber = a.split('-')[0].padStart(5, '0')
      const bNumber = b.split('-')[0].padStart(5, '0')

      return aNumber - bNumber
    })
    .map(problem => `- [${getProblemName(problem)}](${REPO_URL}/blob/main/src/${item.level}/${problem})`)
    .join('\n')

  const totalProblemsByLevel = item.solvedProblems.length + item.unsolvedProblems.length
  let counter = `(${item.solvedProblems.length}/${totalProblemsByLevel})`

  if (item.solvedProblems.length === totalProblemsByLevel) {
    counter += ' ✅'
  }

  return t + `
### ${humanize(getLevelName(item.level))} ${counter}

${problemsTemplate}
`
}, problemsHeader)

const README_LINES = fs.readFileSync(path.join(__dirname, '../README.md'), { encoding: 'utf8' }).split('\n')

const README_HEADER = README_LINES.slice(0, README_LINES.findIndex(value => /^## Problems.*/.test(value))).join('\n')

const NEW_README = README_HEADER + template + problems.reduce((temp, item) => {
  const items = item
    .unsolvedProblems
    .sort((a, b) => {
      const aNumber = a.split('-')[0].padStart(5, '0')
      const bNumber = b.split('-')[0].padStart(5, '0')

      return aNumber - bNumber
    })
    .map(problem => `- [${item.level.toUpperCase().split('-')[1]} - ${getProblemName(problem.replace('.todo', ''))}](${REPO_URL}/blob/main/src/${item.level}/${problem})`)
    .join('\n')

  return temp + '\n' + items
}, '\n ## Unsolved Problems')

fs.writeFileSync(path.join(__dirname, '../README.md'), NEW_README, { encoding: 'utf-8' })

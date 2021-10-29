const LevelMap = new Map()

LevelMap.set([0, 30], {
  desc: '非常不符合要求',
  suggest: '过滤',
  color: '#f5222d'
})
LevelMap.set([30, 50], {
  desc: '不符合要求',
  suggest: '过滤',
  color: '#ff9c6e'
})
LevelMap.set([50, 60], {
  desc: '较为不符合要求',
  suggest: '过滤 或 候查',
  color: '#ffa940'
})
LevelMap.set([60, 70], {
  desc: '较为符合要求',
  suggest: '候选',
  color: '#08979c'
})
LevelMap.set([70, 90], {
  desc: '符合要求',
  suggest: '候选',
  color: '#1890ff'
})
LevelMap.set([90, 100], {
  desc: '很符合要求',
  suggest: '通过',
  color: '#389e0d'
})

export default LevelMap
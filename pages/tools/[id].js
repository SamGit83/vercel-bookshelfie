import { useState, useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { getToolById, tools } from '../../lib/tools'

const iconColors = {
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  green: 'bg-emerald-50 text-emerald-600',
  orange: 'bg-orange-50 text-orange-600',
  yellow: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  teal: 'bg-teal-50 text-teal-600',
  pink: 'bg-pink-50 text-pink-600',
  cyan: 'bg-cyan-50 text-cyan-600',
  slate: 'bg-slate-50 text-slate-600',
}

const iconBadgeColors = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-emerald-100 text-emerald-700',
  orange: 'bg-orange-100 text-orange-700',
  yellow: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  teal: 'bg-teal-100 text-teal-700',
  pink: 'bg-pink-100 text-pink-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  slate: 'bg-slate-100 text-slate-700',
}

function ToolIcon({ name, className }) {
  const icons = {
    camera: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    list: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    star: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
    trophy: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228M18.75 4.236V2.721M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 12.75V14.25m0-3.75V2.25" />,
    sparkles: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />,
    bookOpen: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    keyboard: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V15zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V15zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V17.25a4.5 4.5 0 004.5 4.5h7.5a4.5 4.5 0 004.5-4.5V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />,
  }

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      {icons[name] || icons.bookOpen}
    </svg>
  )
}

const WORD_POOL = [
  'the','be','to','of','and','a','in','that','have','it','for','not','on','with','he','as','you','do','at','this',
  'but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their',
  'what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just',
  'him','know','take','people','into','year','your','good','some','could','them','see','other','than','then','now',
  'look','only','come','its','over','think','also','back','after','use','two','how','our','work','first','well','way',
  'even','new','want','because','any','these','give','day','most','used','read','book','story','word','light','world',
  'heart','dream','season','ocean','garden','silver','golden','simple','poetry','morning','river','forest','wonder','magic',
  'page','write','mind','space','play','home','life','love','hope','faith','trust','grace','peace','quiet','sound','music',
  'stand','fall','rise','walk','run','swim','sing','dance','laugh','smile','watch','listen','touch','taste','feel','hear',
  'speak','learn','teach','grow','change','begin','start','stop','keep','break','build','create','save','win','move','stay',
  'paper','pencil','window','table','chair','clock','phone','letter','number','color','shape','circle','square','line','point',
  'water','fire','earth','wind','stone','metal','glass','wood','cloud','storm','snow','rain','sun','moon','star','sky',
  'happy','angry','quiet','loud','quick','slow','large','small','heavy','clear','dark','bright','warm','cold','soft','hard',
  'friend','family','school','market','office','street','city','town','field','mountain','valley','island','bridge','road','path',
  'animal','bird','fish','horse','tiger','eagle','whale','snake','mouse','sheep','plant','flower','grass','leaf','seed','fruit',
]

const QUOTES = [
  { text: 'The only way to do great work is to love what you do', source: 'Steve Jobs', length: 'short' },
  { text: 'In the middle of difficulty lies opportunity for those who are willing to look closely', source: 'Albert Einstein', length: 'medium' },
  { text: 'Success is not final failure is not fatal it is the courage to continue that counts', source: 'Winston Churchill', length: 'medium' },
  { text: 'It does not matter how slowly you go as long as you do not stop moving forward toward your goal', source: 'Confucius', length: 'long' },
  { text: 'The future belongs to those who believe in the beauty of their dreams and chase them daily', source: 'Eleanor Roosevelt', length: 'medium' },
  { text: 'Do not watch the clock do what it does keep going and never look back at what could have been', source: 'Sam Levenson', length: 'long' },
]

const CUSTOM_TEXT = 'the quick brown fox jumps over the lazy dog while the curious cat watches from a sunny window above the quiet garden'

const BADGES = [
  { label: 'turtle', min: 0, max: 20, color: '#646669' },
  { label: 'steady', min: 21, max: 40, color: '#5fb3b3' },
  { label: 'swift', min: 41, max: 70, color: '#e2b714' },
  { label: 'pro', min: 71, max: 100, color: '#e08c4e' },
  { label: 'legend', min: 101, max: 999, color: '#ca4754' },
]

const TT_THEMES = {
  dark: {
    bg: '#323437', sub: '#646669', subAlt: '#2c2e31', text: '#d1d0c5',
    main: '#e2b714', error: '#ca4754', errorExtra: '#7e2a33',
  },
  light: {
    bg: '#eaeaea', sub: '#9099a3', subAlt: '#dcdcdc', text: '#444444',
    main: '#bb9b00', error: '#d4002a', errorExtra: '#e8a0ad',
  },
}

function ttRandInt(n) {
  return Math.floor(Math.random() * n)
}

function makeWords(count, { punctuation, numbers }) {
  const out = []
  let capNext = true
  for (let i = 0; i < count; i++) {
    if (numbers && Math.random() < 0.12) {
      out.push(String(ttRandInt(10000)))
      continue
    }
    let w = WORD_POOL[ttRandInt(WORD_POOL.length)]
    if (punctuation) {
      if (capNext) {
        w = w[0].toUpperCase() + w.slice(1)
        capNext = false
      }
      const r = Math.random()
      if (r < 0.04) {
        w = '"' + w + '"'
      } else if (r > 0.88) {
        const marks = ['.', ',', '!', '?', ';', ':']
        const m = marks[ttRandInt(marks.length)]
        w = w + m
        if (m === '.' || m === '!' || m === '?') capNext = true
      }
    }
    out.push(w)
  }
  return out
}

function ttCharStats(typedArr, wordsArr, upTo) {
  let correct = 0, incorrect = 0, extra = 0, missed = 0
  for (let w = 0; w < typedArr.length; w++) {
    const t = wordsArr[w] || ''
    const inp = typedArr[w] || ''
    const submitted = w < upTo
    if (!inp && !submitted) continue
    const minL = Math.min(t.length, inp.length)
    for (let i = 0; i < minL; i++) {
      if (inp[i] === t[i]) correct++
      else incorrect++
    }
    if (inp.length > t.length) extra += inp.length - t.length
    if (submitted) {
      if (inp.length < t.length) missed += t.length - inp.length
      correct++
    }
  }
  return { correct, incorrect, extra, missed }
}

function ttConsistency(samples) {
  const arr = samples.map((s) => s.raw).filter((x) => x > 0)
  if (arr.length < 2) return 100
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length
  if (mean === 0) return 0
  const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length
  const cv = Math.sqrt(variance) / mean
  return Math.max(0, Math.min(100, Math.round((1 - cv) * 100)))
}

function TypingTest() {
  const [mode, setMode] = useState('time')
  const [timeAmount, setTimeAmount] = useState(30)
  const [wordAmount, setWordAmount] = useState(25)
  const [punctuation, setPunctuation] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [theme, setTheme] = useState('dark')

  const [words, setWords] = useState([])
  const [typed, setTyped] = useState([])
  const [activeWord, setActiveWord] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [samples, setSamples] = useState([])
  const [result, setResult] = useState(null)
  const [focused, setFocused] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [lineH, setLineH] = useState(44)
  const [quoteSource, setQuoteSource] = useState('')

  const inputRef = useRef(null)
  const activeWordRef = useRef(null)
  const startTimeRef = useRef(0)
  const lastSecRef = useRef(0)
  const errCountRef = useRef(0)
  const lastErrRef = useRef(0)

  const typedRef = useRef(typed)
  const activeRef = useRef(activeWord)
  const wordsRef = useRef(words)
  const modeRef = useRef(mode)
  const timeAmtRef = useRef(timeAmount)
  const samplesRef = useRef(samples)
  const startedRef = useRef(false)
  const finishedRef = useRef(false)

  typedRef.current = typed
  activeRef.current = activeWord
  wordsRef.current = words
  modeRef.current = mode
  timeAmtRef.current = timeAmount
  samplesRef.current = samples

  const c = TT_THEMES[theme]

  const generate = () => {
    if (mode === 'quote') {
      const q = QUOTES[ttRandInt(QUOTES.length)]
      setQuoteSource(q.source)
      return q.text.split(' ')
    }
    if (mode === 'zen') return ['']
    if (mode === 'custom') return CUSTOM_TEXT.split(/\s+/)
    const count = mode === 'time' ? Math.max(80, timeAmount * 3) : wordAmount
    return makeWords(count, { punctuation, numbers })
  }

  const restart = () => {
    startedRef.current = false
    finishedRef.current = false
    const w = generate()
    setWords(w)
    setTyped([])
    setActiveWord(0)
    setStarted(false)
    setFinished(false)
    setElapsed(0)
    setSamples([])
    setResult(null)
    setScrollY(0)
    errCountRef.current = 0
    lastErrRef.current = 0
    lastSecRef.current = 0
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { restart() }, [mode, timeAmount, wordAmount, punctuation, numbers])

  useEffect(() => {
    const el = activeWordRef.current
    if (!el) return
    const lh = el.offsetHeight || 44
    setLineH(lh)
    const top = el.offsetTop
    setScrollY(top > lh ? top - lh : 0)
  }, [activeWord, words, theme])

  // Keep the word stream topped up in time mode so fast typists never run dry.
  useEffect(() => {
    if (mode === 'time' && !finished && words.length > 0 && words.length - activeWord < 20) {
      setWords((w) => [...w, ...makeWords(40, { punctuation, numbers })])
    }
  }, [activeWord, mode, finished, words.length, punctuation, numbers])

  const computeWpm = (st, min) => {
    if (min <= 0) return { wpm: 0, raw: 0 }
    return {
      wpm: Math.round((st.correct / 5) / min),
      raw: Math.round(((st.correct + st.incorrect + st.extra) / 5) / min),
    }
  }

  const finish = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    const el = modeRef.current === 'time'
      ? timeAmtRef.current
      : (Date.now() - startTimeRef.current) / 1000
    const upTo = activeRef.current
    const st = ttCharStats(typedRef.current, wordsRef.current, upTo)
    const { wpm, raw } = computeWpm(st, el / 60)
    const totalTyped = st.correct + st.incorrect + st.extra
    const acc = totalTyped > 0 ? Math.round((st.correct / totalTyped) * 100) : 100
    const badge = BADGES.find((b) => wpm >= b.min && wpm <= b.max) || BADGES[0]
    setResult({
      wpm, raw, acc, chars: st, time: Math.round(el),
      consistency: ttConsistency(samplesRef.current), badge,
    })
    setFinished(true)
  }

  const start = () => {
    if (startedRef.current) return
    startedRef.current = true
    setStarted(true)
    startTimeRef.current = Date.now()
    lastSecRef.current = 0
    lastErrRef.current = 0
  }

  useEffect(() => {
    if (!started || finished) return
    const id = setInterval(() => {
      const el = (Date.now() - startTimeRef.current) / 1000
      if (modeRef.current === 'time' && timeAmtRef.current - el <= 0) {
        finish()
        return
      }
      const sec = Math.floor(el)
      if (sec > lastSecRef.current) {
        lastSecRef.current = sec
        // Only re-render the tree once per second (the visible countdown is whole seconds).
        setElapsed(el)
        const st = ttCharStats(typedRef.current, wordsRef.current, activeRef.current)
        const { wpm, raw } = computeWpm(st, el / 60)
        const errDelta = errCountRef.current - lastErrRef.current
        lastErrRef.current = errCountRef.current
        setSamples((s) => [...s, { second: sec, wpm, raw, err: errDelta }])
      }
    }, 100)
    return () => clearInterval(id)
  }, [started, finished])

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') { e.preventDefault(); restart(); return }
    if (e.key === 'Escape') { e.preventDefault(); restart(); return }
    if (finished) return

    if (e.key === ' ') {
      e.preventDefault()
      const cur = typed[activeWord] || ''
      if (cur.length === 0 && mode !== 'zen') return
      if (!started) start()
      const next = activeWord + 1
      if (mode === 'zen') {
        setTyped((t) => { const n = [...t]; n[next] = ''; return n })
        setWords((w) => [...w, ''])
        setActiveWord(next)
        return
      }
      setActiveWord(next)
      if ((mode === 'words' || mode === 'custom' || mode === 'quote') && next >= words.length) {
        setTimeout(finish, 0)
      }
      return
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
      const cur = typed[activeWord] || ''
      if (e.ctrlKey || e.altKey || e.metaKey) {
        setTyped((t) => { const n = [...t]; n[activeWord] = ''; return n })
        return
      }
      if (cur.length > 0) {
        setTyped((t) => { const n = [...t]; n[activeWord] = cur.slice(0, -1); return n })
      } else if (activeWord > 0) {
        const prev = activeWord - 1
        const pv = typed[prev] || ''
        if (pv !== words[prev]) setActiveWord(prev)
      }
      return
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault()
      if (!started) start()
      const target = words[activeWord] || ''
      const cur = typed[activeWord] || ''
      if (mode !== 'zen' && cur.length >= target.length + 8) return
      const newInput = cur + e.key
      if (mode !== 'zen') {
        const idx = cur.length
        if (e.key !== target[idx]) errCountRef.current += 1
      }
      setTyped((t) => { const n = [...t]; n[activeWord] = newInput; return n })
      if ((mode === 'words' || mode === 'custom' || mode === 'quote')
        && activeWord === words.length - 1 && newInput === target) {
        setTimeout(finish, 0)
      }
    }
  }

  const renderWords = () => {
    return words.map((word, i) => {
      const inp = typed[i] || ''
      const isActive = i === activeWord && !finished
      const isDone = i < activeWord
      const hasError = isDone && inp !== word
      const letters = []
      const maxLen = Math.max(word.length, inp.length)
      for (let ci = 0; ci < maxLen; ci++) {
        if (isActive && ci === inp.length) {
          letters.push(<span key={'car' + ci} className="tt-caret" style={{ background: c.main }} />)
        }
        if (ci < word.length) {
          let col = c.sub
          if (ci < inp.length) col = inp[ci] === word[ci] ? c.text : c.error
          letters.push(<span key={ci} style={{ color: col }}>{word[ci]}</span>)
        } else {
          letters.push(<span key={ci} style={{ color: c.errorExtra }}>{inp[ci]}</span>)
        }
      }
      if (isActive && inp.length >= maxLen) {
        letters.push(<span key="car-end" className="tt-caret" style={{ background: c.main }} />)
      }
      return (
        <div
          key={i}
          ref={isActive ? activeWordRef : null}
          className="inline-flex items-center"
          style={{
            marginRight: '0.6em',
            borderBottom: hasError ? `2px solid ${c.error}` : '2px solid transparent',
            paddingBottom: 2,
          }}
        >
          {letters.length ? letters : <span style={{ color: c.sub }}>{word}</span>}
        </div>
      )
    })
  }

  const renderGraph = () => {
    const pad = { l: 28, r: 10, t: 10, b: 18 }
    const W = 520, H = 200
    const data = samples.length ? samples : [{ second: 0, wpm: 0, raw: 0, err: 0 }]
    const maxY = Math.max(10, ...data.map((d) => Math.max(d.wpm, d.raw)))
    const maxX = Math.max(1, data[data.length - 1].second)
    const px = (s) => pad.l + (s / maxX) * (W - pad.l - pad.r)
    const py = (v) => H - pad.b - (v / maxY) * (H - pad.t - pad.b)
    const line = (key) => data.map((d) => `${px(d.second)},${py(d[key])}`).join(' ')
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 220 }}>
        {[0, 0.5, 1].map((f, idx) => (
          <g key={idx}>
            <line x1={pad.l} x2={W - pad.r} y1={py(maxY * f)} y2={py(maxY * f)} stroke={c.subAlt} strokeWidth="1" />
            <text x={4} y={py(maxY * f) + 4} fill={c.sub} fontSize="10" fontFamily="monospace">{Math.round(maxY * f)}</text>
          </g>
        ))}
        <polyline fill="none" stroke={c.sub} strokeWidth="2" strokeLinejoin="round" points={line('raw')} opacity="0.6" />
        <polyline fill="none" stroke={c.main} strokeWidth="2" strokeLinejoin="round" points={line('wpm')} />
        {data.filter((d) => d.err > 0).map((d, idx) => (
          <text key={idx} x={px(d.second)} y={py(d.wpm) - 6} fill={c.error} fontSize="12" textAnchor="middle">×</text>
        ))}
      </svg>
    )
  }

  const remaining = Math.max(0, Math.ceil(timeAmount - elapsed))
  const liveLabel = mode === 'time'
    ? (started ? remaining : timeAmount)
    : mode === 'zen'
      ? activeWord
      : `${Math.min(activeWord, words.length)}/${words.length}`

  const ModeTab = ({ id, label, icon }) => (
    <button
      onClick={() => setMode(id)}
      className="flex items-center gap-1.5 px-2 py-1 text-sm font-mono transition-colors"
      style={{ color: mode === id ? c.main : c.sub }}
    >
      {icon}
      {label}
    </button>
  )

  const Amount = ({ value, current, onClick }) => (
    <button
      onClick={onClick}
      className="px-2 py-1 text-sm font-mono transition-colors"
      style={{ color: current === value ? c.main : c.sub }}
    >
      {value}
    </button>
  )

  const Toggle = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2 py-1 text-sm font-mono transition-colors"
      style={{ color: active ? c.main : c.sub }}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen w-full font-mono transition-colors" style={{ background: c.bg }}>
      <Head>
        <title>Typing Test — Book Shelfie</title>
        <meta name="description" content="A clean, minimal typing speed test. Measure your WPM, accuracy and consistency." />
      </Head>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Breadcrumb / brand row */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/free-tools" className="flex items-center gap-2 text-sm" style={{ color: c.sub }}>
            <ToolIcon name="keyboard" className="w-5 h-5" />
            <span className="font-semibold" style={{ color: c.main }}>typetest</span>
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-sm px-3 py-1.5 rounded-lg transition-colors"
            style={{ background: c.subAlt, color: c.sub }}
          >
            {theme === 'dark' ? 'light' : 'dark'}
          </button>
        </div>

        {/* Config bar */}
        {!finished && (
          <div className="flex justify-center mb-12">
            <div
              className="flex flex-wrap items-center gap-1 rounded-xl px-2 py-1.5 text-sm"
              style={{ background: c.subAlt }}
            >
              <Toggle active={punctuation} onClick={() => setPunctuation((v) => !v)}>
                <span>@</span> punctuation
              </Toggle>
              <Toggle active={numbers} onClick={() => setNumbers((v) => !v)}>
                <span>#</span> numbers
              </Toggle>

              <span className="w-px h-5 mx-1" style={{ background: c.bg }} />

              <ModeTab id="time" label="time" icon={<span>⏱</span>} />
              <ModeTab id="words" label="words" icon={<span>A</span>} />
              <ModeTab id="quote" label="quote" icon={<span>❝</span>} />
              <ModeTab id="zen" label="zen" icon={<span>∞</span>} />
              <ModeTab id="custom" label="custom" icon={<span>⚙</span>} />

              {(mode === 'time' || mode === 'words') && (
                <span className="w-px h-5 mx-1" style={{ background: c.bg }} />
              )}

              {mode === 'time' && [15, 30, 60, 120].map((v) => (
                <Amount key={v} value={v} current={timeAmount} onClick={() => setTimeAmount(v)} />
              ))}
              {mode === 'words' && [10, 25, 50, 100].map((v) => (
                <Amount key={v} value={v} current={wordAmount} onClick={() => setWordAmount(v)} />
              ))}
            </div>
          </div>
        )}

        {!finished ? (
          <>
            {/* Language */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 text-sm" style={{ color: c.sub }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5 0 4.5-4 4.5-9S14.5 3 12 3 7.5 7 7.5 12s2 9 4.5 9zM3.5 9h17M3.5 15h17" />
                </svg>
                english
              </div>
            </div>

            {/* Live counter */}
            <div className="mb-3 text-2xl sm:text-3xl" style={{ color: c.main }}>
              {liveLabel}
            </div>

            {/* Words / typing area */}
            <div
              className="relative cursor-text outline-none"
              tabIndex={0}
              onClick={() => inputRef.current?.focus()}
              style={{ height: lineH * 3 }}
            >
              <div
                className="overflow-hidden"
                style={{ height: lineH * 3, filter: focused ? 'none' : 'blur(5px)', transition: 'filter .15s' }}
              >
                <div
                  className="relative flex flex-wrap text-2xl sm:text-3xl"
                  style={{ transform: `translateY(-${scrollY}px)`, transition: 'transform .15s', lineHeight: '1.6' }}
                >
                  {renderWords()}
                </div>
              </div>

              {!focused && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ color: c.text }}>
                  <span className="text-base">click here or press any key to focus</span>
                </div>
              )}

              <input
                ref={inputRef}
                type="text"
                value=""
                onChange={() => {}}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="absolute inset-0 w-full h-full opacity-0 cursor-text"
                aria-label="Typing input"
              />
            </div>

            {/* Restart */}
            <div className="flex justify-center mt-12">
              <button
                onClick={restart}
                title="Restart test (Tab)"
                className="p-3 rounded-lg transition-colors hover:opacity-100"
                style={{ color: c.sub }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>

            <p className="text-center text-xs mt-6" style={{ color: c.sub }}>
              <span style={{ color: c.text }}>tab</span> + restart &nbsp;·&nbsp; <span style={{ color: c.text }}>esc</span> + restart
            </p>
          </>
        ) : (
          /* Results */
          <div className="animate-fadeIn">
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-sm" style={{ color: c.sub }}>wpm</div>
                <div className="text-6xl sm:text-7xl font-bold leading-none" style={{ color: c.main }}>{result.wpm}</div>
                <div className="text-sm mt-4" style={{ color: c.sub }}>acc</div>
                <div className="text-4xl sm:text-5xl font-bold leading-none" style={{ color: c.main }}>{result.acc}%</div>
                <div
                  className="mt-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: c.subAlt, color: result.badge.color }}
                >
                  {result.badge.label}
                </div>
              </div>
              <div className="flex-1 w-full rounded-xl p-4" style={{ background: c.subAlt }}>
                {renderGraph()}
                <div className="flex justify-center gap-6 mt-2 text-xs" style={{ color: c.sub }}>
                  <span><span style={{ color: c.main }}>—</span> wpm</span>
                  <span><span style={{ color: c.sub }}>—</span> raw</span>
                  <span><span style={{ color: c.error }}>×</span> errors</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'test type', value: mode === 'time' ? `time ${timeAmount}` : mode === 'words' ? `words ${wordAmount}` : mode },
                { label: 'raw', value: result.raw },
                { label: 'characters', value: `${result.chars.correct}/${result.chars.incorrect}/${result.chars.extra}/${result.chars.missed}` },
                { label: 'consistency', value: `${result.consistency}%` },
                { label: 'time', value: `${result.time}s` },
                { label: 'accuracy', value: `${result.acc}%` },
                { label: 'words', value: activeWord },
                { label: 'source', value: mode === 'quote' ? quoteSource : 'english' },
              ].map((s, idx) => (
                <div key={idx}>
                  <div className="text-xs" style={{ color: c.sub }}>{s.label}</div>
                  <div className="text-xl sm:text-2xl" style={{ color: c.main }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={restart}
                className="px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
                style={{ background: c.main, color: c.bg }}
              >
                next test
              </button>
              <Link
                href="/free-tools"
                className="px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
                style={{ background: c.subAlt, color: c.sub }}
              >
                back to tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AIPromptGenerator() {
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    length: 'medium',
    style: 'creative',
    targetAudience: '',
    keyFocusAreas: ''
  })
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setGeneratedPrompt('')

    // Debug: Log what values are being submitted
    console.log('[DEBUG] Submitting form data:', formData)

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate prompt')
      }

      const data = await response.json()
      setGeneratedPrompt(data.prompt)
    } catch (err) {
      setError(err.message || 'An error occurred while generating the prompt')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this AI prompt I generated: ${generatedPrompt.substring(0, 200)}...`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420')
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <>
      <Head>
        <title>AI Prompt Generator — Book Shelfie</title>
        <meta name="description" content="Generate creative prompts for writing, brainstorming, or AI interactions." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/#tools" className="hover:text-brand-600 transition-colors">Tools</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-900 font-medium">AI Prompt Generator</span>
        </nav>

        {/* Header */}
        <div className="card p-8 sm:p-12 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600">
              <ToolIcon name="sparkles" className="w-8 h-8" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Prompt Generator</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                  Active
                </span>
              </div>
              
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl">
                Generate creative prompts for writing, brainstorming, or AI interactions. Customize the topic, tone, length, and style to get the perfect prompt for your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customize Your Prompt</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="e.g., Science fiction story, Marketing campaign, Recipe ideas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Tone */}
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="formal">Formal</option>
                  <option value="humorous">Humorous</option>
                  <option value="inspirational">Inspirational</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
                  Length
                </label>
                <select
                  id="length"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="short">Short (1-10 sentences)</option>
                  <option value="medium">Medium (10-20 sentences)</option>
                  <option value="long">Long (20-1000 sentences)</option>
                </select>
              </div>

              {/* Style */}
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <select
                  id="style"
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  className="w-full h-[42px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="creative">Creative</option>
                  <option value="analytical">Analytical</option>
                  <option value="descriptive">Descriptive</option>
                  <option value="narrative">Narrative</option>
                  <option value="instructional">Instructional</option>
                  <option value="persuasive">Persuasive</option>
                </select>
              </div>

              {/* Target Audience */}
              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  placeholder="e.g., developers, marketers, students"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Key Focus Areas */}
              <div>
                <label htmlFor="keyFocusAreas" className="block text-sm font-medium text-gray-700 mb-2">
                  Key Focus Areas
                </label>
                <input
                  type="text"
                  id="keyFocusAreas"
                  name="keyFocusAreas"
                  value={formData.keyFocusAreas}
                  onChange={handleInputChange}
                  placeholder="e.g., productivity, automation, best practices (comma-separated)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">Separate multiple areas with commas</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.topic}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Prompt
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output */}
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Generated Prompt</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            {!generatedPrompt && !error && !loading && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <p className="text-gray-500">Your generated prompt will appear here</p>
              </div>
            )}

            {generatedPrompt && (
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  {generatedPrompt.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-800 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-brand-700 bg-brand-50 rounded-lg hover:bg-brand-100 transition-all duration-200 border border-brand-200"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                        Copy to Clipboard
                      </>
                    )}
                  </button>

                  <button
                    onClick={shareOnTwitter}
                    className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Share
                  </button>

                  <button
                    onClick={shareOnLinkedIn}
                    className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-brand-600 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to all tools
          </Link>
        </div>
      </div>
    </>
  )
}

const QUIZ_QUESTIONS = [
  {
    id: 'mood',
    question: "What's your vibe right now?",
    options: [
      { emoji: '😊', label: 'Feel-good & uplifting', value: 'feel-good' },
      { emoji: '🌑', label: 'Dark & intense', value: 'dark' },
      { emoji: '😂', label: 'Funny & light', value: 'funny' },
      { emoji: '🤔', label: 'Thought-provoking', value: 'thought-provoking' },
    ],
  },
  {
    id: 'genre',
    question: 'Pick your genre',
    options: [
      { emoji: '🧙', label: 'Fantasy & Sci-Fi', value: 'fantasy' },
      { emoji: '🔍', label: 'Mystery & Thriller', value: 'mystery' },
      { emoji: '💕', label: 'Romance', value: 'romance' },
      { emoji: '📖', label: 'Literary Fiction', value: 'literary-fiction' },
      { emoji: '🌍', label: 'Non-fiction', value: 'non-fiction' },
    ],
  },
  {
    id: 'pace',
    question: 'How fast do you like your reads?',
    options: [
      { emoji: '⚡', label: 'Fast-paced page-turner', value: 'fast' },
      { emoji: '🌊', label: 'Slow & immersive', value: 'slow' },
      { emoji: '⚖️', label: 'Balanced mix', value: 'medium' },
    ],
  },
  {
    id: 'protagonist',
    question: "Who's the story about?",
    options: [
      { emoji: '👤', label: 'A lone hero on a quest', value: 'unlikely-hero' },
      { emoji: '👥', label: 'A group of friends/found family', value: 'group' },
      { emoji: '💑', label: 'Two people falling in love', value: 'romance-duo' },
      { emoji: '🌐', label: 'Society / big ideas', value: 'society' },
    ],
  },
  {
    id: 'setting',
    question: 'What setting excites you?',
    options: [
      { emoji: '🏰', label: 'Magical / fantasy world', value: 'fantasy-world' },
      { emoji: '🌆', label: 'Modern city life', value: 'contemporary' },
      { emoji: '🕰️', label: 'Historical past', value: 'historical' },
      { emoji: '🚀', label: 'Future / space', value: 'sci-fi' },
    ],
  },
  {
    id: 'length',
    question: 'How long is your attention span right now?',
    options: [
      { emoji: '📗', label: 'Short (under 300 pages)', value: 'short' },
      { emoji: '📘', label: 'Medium (300–500 pages)', value: 'medium' },
      { emoji: '📕', label: 'Long (500+ pages, bring it on)', value: 'long' },
    ],
  },
  {
    id: 'goal',
    question: 'What do you want from this book?',
    options: [
      { emoji: '🎢', label: 'Escapism & adventure', value: 'escapism' },
      { emoji: '💡', label: 'Learn something new', value: 'educational' },
      { emoji: '😢', label: 'Feel all the emotions', value: 'emotional' },
      { emoji: '😌', label: 'Comfort & coziness', value: 'comfort' },
    ],
  },
  {
    id: 'audience',
    question: 'Who are you reading for?',
    options: [
      { emoji: '🧒', label: "I'm a teen / young adult", value: 'young-adult' },
      { emoji: '🧑', label: "I'm an adult (20s–30s)", value: 'adult' },
      { emoji: '🧓', label: "I'm older (40s+)", value: 'mature' },
      { emoji: '👨‍👩‍👧', label: 'Reading with my kids', value: 'children' },
    ],
  },
]

function BookRecommendationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [phase, setPhase] = useState('quiz') // 'quiz' | 'loading' | 'results'
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popularity') // 'popularity' | 'rating' | 'title-asc' | 'title-desc' | 'author-asc' | 'author-desc' | 'year-desc' | 'year-asc'
  const [viewMode, setViewMode] = useState('card') // 'card' | 'list'
  const submitting = useRef(false)

  const totalQuestions = QUIZ_QUESTIONS.length
  const progress = ((currentQuestion) / totalQuestions) * 100

  const handleAnswer = async (questionId, optionLabel) => {
    if (submitting.current) return
    const newAnswers = { ...answers, [questionId]: optionLabel }
    setAnswers(newAnswers)

    if (currentQuestion < totalQuestions - 1) {
      setAnimating(true)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
        setAnimating(false)
      }, 250)
    } else {
      // Last question answered — fetch recommendations
      submitting.current = true
      setPhase('loading')
      try {
        const res = await fetch('/api/book-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        })
        const data = await res.json()
        
        // DEBUG: Log response details
        console.log('[book-quiz] Response status:', res.ok)
        console.log('[book-quiz] Books received:', data.books?.length || 0)
        if (data.books?.length > 0) {
          console.log('[book-quiz] First book:', JSON.stringify(data.books[0], null, 2))
        }
        
        if (!res.ok) throw new Error(data.error || 'Failed to fetch recommendations')
        setBooks(data.books || [])
        setPhase('results')
      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.')
        setPhase('results')
      } finally {
        submitting.current = false
      }
    }
  }

  const retakeQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setPhase('quiz')
    setBooks([])
    setError(null)
    setCopied(false)
    setSearchQuery('')
    setSortBy('popularity')
    setViewMode('card')
  }

  // Sort and filter books
  const getFilteredAndSortedBooks = () => {
    let filtered = books
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.authors.join(' ').toLowerCase().includes(query)
      )
    }
    
    // Sort books
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        case 'author-asc':
          return a.authors.join('').localeCompare(b.authors.join(''))
        case 'author-desc':
          return b.authors.join('').localeCompare(a.authors.join(''))
        case 'year-desc':
          return (b.year || 0) - (a.year || 0)
        case 'year-asc':
          return (a.year || 0) - (b.year || 0)
        default:
          return (b.popularity || 0) - (a.popularity || 0)
      }
    })
    
    return sorted
  }

  // Format book list for sharing
  const getBookListText = () => {
    if (!books || books.length === 0) return ''
    
    const bookList = books.map((book, index) => {
      const author = book.authors?.join(', ') || 'Unknown Author'
      const year = book.year ? ` (${book.year})` : ''
      return `${index + 1}. ${book.title} by ${author}${year}`
    }).join('\n')
    
    return `📚 My Book Recommendations:\n${bookList}`
  }

  const shareCaption = `I just discovered my next ${books.length} reads with Bookshelfie's Book Quiz! 📚✨\n\n${getBookListText()}\n\nTry it free at https://bookshelfieapp.com #BookRecommendations #Bookshelfie`

  // Check if native share is available (mobile devices)
  const canNativeShare = () => {
    return navigator.share && navigator.canShare && typeof navigator.share === 'function'
  }

  const handleNativeShare = async () => {
    if (canNativeShare()) {
      try {
        await navigator.share({
          title: 'Book Shelfie - Book Quiz Results',
          text: shareCaption,
          url: 'https://bookshelfieapp.com'
        })
        return true
      } catch (err) {
        // User cancelled or error - fall back to other methods
        if (err.name !== 'AbortError') {
          console.log('Native share failed:', err)
        }
      }
    }
    return false
  }

  const copyCaptionToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareCaption)
      return true
    } catch (err) {
      console.error('Failed to copy:', err)
      return false
    }
  }

  const openInstagram = async () => {
    // Try native share first (works on mobile)
    const nativeSuccess = await handleNativeShare()
    if (nativeSuccess) return

    // Try to open Instagram app via URL scheme (mobile)
    const instagramAppUrl = 'instagram://library?AssetPath=&Caption='
    const instagramWebUrl = 'https://www.instagram.com/'
    
    // Try opening Instagram app first, fall back to web
    const instagramWindow = window.open(instagramAppUrl, '_blank')
    
    // If Instagram app didn't open (or opened but user may want web), also copy caption
    // Show user that they can paste the caption
    const copied = await copyCaptionToClipboard()
    if (copied) {
      // Open Instagram web as fallback, but show a toast about copying
      window.open(instagramWebUrl, '_blank')
      alert('Caption copied! Open Instagram and paste it to create your post.')
    }
  }

  const shareOnTwitter = () => {
    // Twitter has a ~280 character limit, so we need to truncate
    const maxLength = 250 // Leave room for URL
    let twitterText = shareCaption
    
    if (twitterText.length > maxLength) {
      // Find a good truncation point - try to end at a book entry
      const truncated = twitterText.substring(0, maxLength)
      const lastNewline = truncated.lastIndexOf('\n')
      const lastBullet = truncated.lastIndexOf('.')
      const cutPoint = Math.max(lastNewline, lastBullet)
      
      if (cutPoint > maxLength - 50) {
        twitterText = truncated.substring(0, cutPoint + 1) + '\n...\n\nCheck out more at https://bookshelfieapp.com'
      } else {
        twitterText = truncated + '\n...\n\nCheck out more at https://bookshelfieapp.com'
      }
    }
    
    // Use Twitter Web Intent with both text and URL
    const text = encodeURIComponent(twitterText)
    const url = encodeURIComponent('https://bookshelfieapp.com')
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'width=550,height=420'
    )
  }

  const openSnapchat = async () => {
    // Try native share first (works on mobile)
    const nativeSuccess = await handleNativeShare()
    if (nativeSuccess) return

    // For Snapchat, use the share URL with content
    // Note: Snapchat doesn't have a direct web post creation API
    // The best approach is to use their deep link or copy to clipboard
    const snapchatUrl = 'https://www.snapchat.com/'
    
    // Copy caption to clipboard so user can paste in Snapchat
    const copied = await copyCaptionToClipboard()
    
    // Open Snapchat web
    window.open(snapchatUrl, '_blank')
    
    if (copied) {
      alert('Caption copied! Open Snapchat and paste it to share with your friends.')
    }
  }

  const openWhatsApp = () => {
    // Use WhatsApp web share API with the share caption
    const text = encodeURIComponent(shareCaption)
    window.open(
      `https://wa.me/?text=${text}`,
      '_blank'
    )
  }

  // ── Loading phase ──────────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-6 animate-bounce">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Finding your perfect books…</h2>
        <p className="text-gray-500 text-lg">Searching through thousands of titles just for you</p>
        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  // ── Results phase ──────────────────────────────────────────────────────────
  if (phase === 'results') {
    const filteredBooks = getFilteredAndSortedBooks()
    
    return (
      <div>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Book Picks Are In!</h2>
          <p className="text-gray-500 text-lg">
            Based on your answers, here are {books.length} books we think you'll love
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Search and Sort Bar */}
        {books.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative sm:w-56">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="author-asc">Author (A-Z)</option>
                <option value="author-desc">Author (Z-A)</option>
                <option value="year-desc">Newest First</option>
                <option value="year-asc">Oldest First</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-gray-300">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'card'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="Card View"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="List View"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Results count */}
        {books.length > 0 && searchQuery && (
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        )}

        {/* Book grid or list view */}
        {filteredBooks.length > 0 ? (
          viewMode === 'card' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200"
                >
                  {/* Cover */}
                  <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 h-44 flex items-center justify-center overflow-hidden">
                    {book.thumbnail ? (
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-5xl">📖</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-indigo-600 font-medium mb-1 line-clamp-1">
                      {book.authors.join(', ')}
                    </p>
                    {/* Rating and Year */}
                    <div className="flex items-center gap-2 mb-2">
                      {book.rating && (
                        <div className="flex items-center gap-0.5">
                          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs text-gray-600 font-medium">{book.rating.toFixed(1)}</span>
                        </div>
                      )}
                      {book.year && (
                        <span className="text-xs text-gray-400">({book.year})</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
                      {(book.description ?? '').substring(0, 100)}
                      {(book.description?.length ?? 0) > 100 ? '…' : ''}
                    </p>
                    {book.previewLink && (
                      <a
                        href={book.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
                      >
                        Preview on Google Books
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-4 mb-12">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row hover:-translate-y-0.5 transition-transform duration-200"
                >
                  {/* Cover - smaller for list view */}
                  <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 h-40 sm:h-auto sm:w-28 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {book.thumbnail ? (
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-4xl">📖</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
                          {book.title}
                        </h3>
                        <p className="text-sm text-indigo-600 font-medium mb-2">
                          {book.authors.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {book.rating && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-gray-600 font-medium">{book.rating.toFixed(1)}</span>
                          </div>
                        )}
                        {book.year && (
                          <span className="text-sm text-gray-400">({book.year})</span>
                        )}
                      </div>
                    </div>

                    {/* Genre/Tags */}
                    {(book.categories || []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {book.categories.slice(0, 3).map((category, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mt-2 line-clamp-2">
                      {book.description || 'No description available.'}
                    </p>

                    {/* Preview Link */}
                    {book.previewLink && (
                      <a
                        href={book.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 w-fit"
                      >
                        Preview on Google Books
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No books found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Share section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Share your results! 🎉</h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Let your friends know what you're reading next
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {/* Instagram */}
            <button
              onClick={openInstagram}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Create Post
            </button>

            {/* Snapchat */}
            <button
              onClick={openSnapchat}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.206.793c.99 0 6.955 4.498 7.153 9.821.006.145.006.291.006.437-.295.18-.677.291-1.077.291-.181 0-.362-.027-.538-.081-1.116-.356-2.013-.356-3.167-.356-1.154 0-2.051 0-3.167.356-.534.166-1.107.101-1.558-.181-.451-.281-.733-.736-.733-1.236 0-.246.091-.481.252-.663.51-.576 1.688-1.887 1.792-2.014.18-.218.467-.337.767-.337.181 0 .357.036.52.101.162.065.314.166.439.296.125.131.227.283.3.449.073.165.117.342.132.52 0 .018.006.036.006.054-.006.018-.006.036-.012.053-.013.195-.08.379-.185.538-.106.159-.249.291-.416.387-.166.097-.349.159-.537.183-.188.025-.377.013-.562-.031-.184-.045-.357-.12-.512-.224-.156-.104-.29-.236-.395-.39-.105-.155-.177-.328-.213-.51-.037-.182-.037-.369 0-.554.037-.184.105-.357.201-.515.097-.159.225-.297.377-.407.152-.11.328-.19.512-.239.184-.048.375-.062.562-.042.188.02.371.072.537.155.167.084.319.193.447.325.129.131.233.285.307.457.074.172.116.357.124.545.007.188-.015.379-.066.562-.05.184-.124.354-.218.505-.095.152-.213.283-.35.39-.136.107-.289.185-.449.229-.16.044-.328.061-.495.049-.168-.012-.333-.049-.487-.109-.154-.061-.293-.145-.411-.249-.118-.104-.215-.228-.285-.366-.071-.139-.117-.293-.135-.452-.018-.16-.006-.324.035-.482.041-.158.11-.304.203-.433.093-.129.209-.239.341-.324.132-.085.281-.146.435-.18.154-.034.314-.041.472-.02.16.021.315.065.46.131.145.066.276.153.389.259.113.105.207.232.279.376.072.143.123.299.152.461.028.162.033.328.013.492-.02.164-.06.32-.12.466-.06.145-.141.277-.238.39-.098.113-.213.207-.34.277-.126.07-.264.117-.406.138-.142.021-.289.022-.432.002-.143-.02-.283-.059-.413-.115-.13-.056-.251-.129-.358-.217-.107-.088-.2-.193-.276-.312-.075-.12-.131-.253-.165-.395-.033-.142-.046-.29-.037-.437.008-.148.034-.293.077-.43.042-.138.1-.266.17-.38.07-.115.157-.217.257-.303.1-.086.215-.158.337-.213.121-.055.253-.09.387-.105.135-.015.272-.012.406.009.135.021.265.057.387.108.121.051.234.116.333.193.099.077.188.168.265.27.076.102.14.213.19.33.05.117.086.24.108.365.022.125.029.253.022.38-.007.127-.03-.127-.03.253-.037.12-.089.236-.155.342-.065.107-.145.201-.236.281-.092.08-.196.145-.307.194-.111.049-.227.082-.345.097-.118.015-.237.018-.354.007z"/>
              </svg>
              Share
            </button>

            {/* Twitter/X */}
            <button
              onClick={shareOnTwitter}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gray-900 text-white hover:bg-gray-700 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Post
            </button>

            {/* WhatsApp */}
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.218 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Share
            </button>
          </div>
        </div>

        {/* Retake */}
        <div className="text-center">
          <button
            onClick={retakeQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200"
          >
            🔄 Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  // ── Quiz phase ─────────────────────────────────────────────────────────────
  const q = QUIZ_QUESTIONS[currentQuestion]

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          📚 Book Recommendation Quiz
        </h1>
        <p className="text-gray-500 text-lg">
          Answer 8 quick questions and get your perfect reading list
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-indigo-600">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-400">{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        className={`transition-all duration-250 ${animating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
        style={{ transition: 'opacity 0.25s ease, transform 0.25s ease' }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
            {q.question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt.value
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(q.id, opt.value)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left font-medium transition-all duration-150 hover:border-indigo-400 hover:bg-indigo-50 active:scale-95 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                      : 'border-gray-200 bg-white text-gray-800'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                  <span className="text-sm sm:text-base leading-snug">{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Back button */}
      {currentQuestion > 0 && (
        <div className="text-center">
          <button
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className="text-sm text-gray-500 hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Previous question
          </button>
        </div>
      )}
    </div>
  )
}

export default function ToolDetail() {
  const router = useRouter()
  const { id } = router.query

  // Handle Typing Test
  if (id === 'typing-test') {
    return <TypingTest />
  }

  // Handle AI Prompt Generator specifically
  if (id === 'ai-prompt-generator') {
    return <AIPromptGenerator />
  }

  // Handle Book Recommendation Quiz
  if (id === 'book-recommendation-quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <main className="max-w-4xl mx-auto px-4 py-12">
          <BookRecommendationQuiz />
        </main>
      </div>
    )
  }

  const tool = id ? getToolById(id) : null

  if (!tool) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  const colorClass = iconColors[tool.color] || iconColors.blue
  const badgeClass = iconBadgeColors[tool.color] || iconBadgeColors.blue

  // Get related tools (exclude current)
  const relatedTools = tools.filter(t => t.id !== tool.id).slice(0, 3)

  return (
    <>
      <Head>
        <title>{tool.title} — Book Shelfie</title>
        <meta name="description" content={tool.desc} />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/#tools" className="hover:text-brand-600 transition-colors">Tools</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-900 font-medium">{tool.title}</span>
        </nav>

        {/* Tool Header */}
        <div className="card p-8 sm:p-12 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorClass}`}>
              <ToolIcon name={tool.iconName} className="w-8 h-8" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{tool.title}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
                  Coming Soon
                </span>
              </div>
              
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl">
                {tool.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Get Book Shelfie App
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <Link href="/" className="btn-secondary">
                  ← Back to all tools
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((t) => (
                <Link
                  key={t.id}
                  href={`/tools/${t.id}`}
                  className="card p-5 flex items-center gap-4 group hover:-translate-y-0.5"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColors[t.color] || iconColors.blue}`}>
                    <ToolIcon name={t.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{t.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{t.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

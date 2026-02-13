import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Check, X, ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import { quizQuestions } from '../../data/quizData';

function QuizQuestion({ question, onAnswer, answered, selectedAnswer }) {
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="text-xs px-2 py-0.5 rounded-full bg-defi-blue/15 text-defi-blue font-medium flex-shrink-0 mt-1">
          {question.section}
        </span>
        <h4 className="text-white font-medium leading-relaxed">{question.question}</h4>
      </div>

      <div className="space-y-2.5">
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === i;
          const isCorrectOption = i === question.correct;
          let style = 'border-defi-border hover:border-defi-blue/40 cursor-pointer';

          if (answered) {
            if (isCorrectOption) {
              style = 'border-defi-green/60 bg-defi-green/10';
            } else if (isSelected && !isCorrect) {
              style = 'border-defi-red/60 bg-defi-red/10';
            } else {
              style = 'border-defi-border/50 opacity-50';
            }
          }

          return (
            <motion.button
              key={i}
              onClick={() => !answered && onAnswer(i)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${style}`}
              whileHover={!answered ? { scale: 1.01 } : {}}
              whileTap={!answered ? { scale: 0.99 } : {}}
            >
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                answered && isCorrectOption
                  ? 'border-defi-green bg-defi-green text-white'
                  : answered && isSelected && !isCorrect
                    ? 'border-defi-red bg-defi-red text-white'
                    : 'border-defi-border text-defi-muted'
              }`}>
                {answered && isCorrectOption ? <Check className="w-3.5 h-3.5" /> :
                 answered && isSelected && !isCorrect ? <X className="w-3.5 h-3.5" /> :
                 String.fromCharCode(65 + i)}
              </span>
              <span className={`text-sm ${answered && isCorrectOption ? 'text-defi-green' : answered && isSelected && !isCorrect ? 'text-defi-red' : 'text-defi-muted'}`}>
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-defi-green/5 border-defi-green/20' : 'bg-defi-red/5 border-defi-red/20'}`}>
              <div className={`text-xs font-semibold mb-1 ${isCorrect ? 'text-defi-green' : 'text-defi-red'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Not quite'}
              </div>
              <p className="text-sm text-defi-muted leading-relaxed">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getBestScore() {
  try { return Number(localStorage.getItem('defi-academy-best-score') || 0); } catch { return 0; }
}

function saveBestScore(score) {
  try {
    const prev = getBestScore();
    if (score > prev) localStorage.setItem('defi-academy-best-score', String(score));
  } catch { /* noop */ }
}

function ScoreCard({ score, total, onReset, bestScore }) {
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';
  const isNewBest = score > bestScore;
  const message =
    pct === 100 ? 'Perfect score! You\'ve mastered DeFi mechanics.' :
    pct >= 80 ? 'Excellent understanding of DeFi fundamentals!' :
    pct >= 60 ? 'Good foundation — review the sections you missed.' :
    'Keep learning! Scroll back through the interactive sections above.';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-8 text-center"
    >
      <Trophy className={`w-12 h-12 mx-auto mb-4 ${pct >= 80 ? 'text-defi-amber' : 'text-defi-muted'}`} />
      <div className="text-5xl font-bold text-white font-mono mb-1">{score}/{total}</div>
      <div className="text-sm text-defi-muted mb-2">{pct}% — Grade {grade}</div>
      {isNewBest && score > 0 && (
        <div className="text-xs text-defi-amber font-medium mb-2">🏆 New personal best!</div>
      )}
      {bestScore > 0 && !isNewBest && (
        <div className="text-xs text-defi-muted mb-2">Best: {bestScore}/{total}</div>
      )}
      <p className="text-sm text-defi-muted mb-6 max-w-md mx-auto">{message}</p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-defi-blue text-white text-sm font-medium hover:bg-defi-blue/80 transition-colors"
      >
        <RotateCcw className="w-4 h-4" /> Retake Quiz
      </button>
    </motion.div>
  );
}

export default function KnowledgeQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [bestScore] = useState(() => getBestScore());

  const question = quizQuestions[currentQ];
  const answered = answers[question.id] !== undefined;
  const totalAnswered = Object.keys(answers).length;
  const score = Object.entries(answers).filter(
    ([qId, ans]) => quizQuestions.find((q) => q.id === Number(qId))?.correct === ans
  ).length;

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [question.id]: optionIndex });
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      saveBestScore(score);
      setShowScore(true);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowScore(false);
  };

  return (
    <SectionWrapper id="quiz" label="Knowledge Quiz">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-amber/10 text-defi-amber text-xs font-medium mb-4">
          <GraduationCap className="w-3.5 h-3.5" /> Test Yourself
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          10 questions covering Flash Loans, MEV, JIT Liquidity, and Security.
          See how much you absorbed from the interactive sections above.
        </p>
      </div>

      {!showScore ? (
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-defi-muted">
              Question {currentQ + 1} of {quizQuestions.length}
            </span>
            <span className="text-xs text-defi-muted">
              {totalAnswered} answered · {score} correct
            </span>
          </div>
          <div className="h-1.5 bg-defi-dark rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-defi-blue rounded-full"
              animate={{ width: `${((currentQ + (answered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="glass rounded-2xl p-6 sm:p-8"
            >
              <QuizQuestion
                question={question}
                onAnswer={handleAnswer}
                answered={answered}
                selectedAnswer={answers[question.id]}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end mt-4"
            >
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-defi-blue text-white text-sm font-medium hover:bg-defi-blue/80 transition-colors"
              >
                {currentQ < quizQuestions.length - 1 ? (
                  <>Next Question <ChevronRight className="w-4 h-4" /></>
                ) : (
                  <>See Results <Trophy className="w-4 h-4" /></>
                )}
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="max-w-lg mx-auto">
          <ScoreCard score={score} total={quizQuestions.length} onReset={handleReset} bestScore={bestScore} />
        </div>
      )}
    </SectionWrapper>
  );
}

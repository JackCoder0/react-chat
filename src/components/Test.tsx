import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export function Test() {
  const [isOpen, setIsOpen] = useState(() => {
    // Recupera estado do localStorage ao iniciar
    const saved = localStorage.getItem('testPanelOpen')
    return saved === 'true'
  })

  const togglePanel = () => {
    setIsOpen((prev) => {
      const next = !prev
      localStorage.setItem('testPanelOpen', String(next))
      return next
    })
  }

  return (
    <div
      className={`fixed right-0 bottom-0 z-50 max-h-[90%] w-[430px] bg-red-500 text-white shadow-xl transition-all duration-300 ${isOpen ? 'h-[70%]' : 'h-[36px]'}`}
    >
      <div
        className="border- flex cursor-pointer items-center justify-center bg-red-600 p-2 hover:bg-red-700"
        onClick={togglePanel}
      >
        {isOpen ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronUp className="h-5 w-5" />
        )}
      </div>

      {/* Conteúdo do painel */}
      {isOpen && (
        <div className="h-full overflow-y-auto p-4">
          <h2 className="mb-2 text-xl font-bold">Olá 👋</h2>
          <p>Conteúdo do painel flutuante...</p>
          <p>Você pode colocar aqui qualquer coisa!</p>
        </div>
      )}
    </div>
  )
}

import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">东莞市澳丽德新材料有限公司</h1>
            </div>
            <div className="flex items-center">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                中文
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                English
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">首页</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-500">网站建设中...</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">© 2026 东莞市澳丽德新材料有限公司</p>
        </div>
      </footer>
    </div>
  )
}

export default App
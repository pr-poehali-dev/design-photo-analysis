import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface TerminalOutput {
  type: 'stdout' | 'stderr' | 'system';
  content: string;
  timestamp: string;
}

const AdminConsole = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<TerminalOutput[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentDir, setCurrentDir] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (isVisible) {
      fetchCurrentDirectory();
    }
  }, [isVisible]);

  const fetchCurrentDirectory = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d4e18qemqrqcfadcukjk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: 'pwd' }),
      });
      const data = await response.json();
      if (data.success && data.output) {
        setCurrentDir(data.output.trim());
      }
    } catch (error) {
      console.error('Ошибка получения директории:', error);
    }
  };

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim() || isExecuting) return;

    setIsExecuting(true);
    const timestamp = new Date().toISOString();

    setOutput((prev) => [
      ...prev,
      {
        type: 'system',
        content: `$ ${cmd}`,
        timestamp,
      },
    ]);

    try {
      const response = await fetch('https://functions.poehali.dev/d4e18qemqrqcfadcukjk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.output) {
          setOutput((prev) => [
            ...prev,
            {
              type: 'stdout',
              content: data.output,
              timestamp: new Date().toISOString(),
            },
          ]);
        }
        if (cmd.startsWith('cd ')) {
          fetchCurrentDirectory();
        }
      } else {
        setOutput((prev) => [
          ...prev,
          {
            type: 'stderr',
            content: data.error || 'Ошибка выполнения команды',
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      setOutput((prev) => [
        ...prev,
        {
          type: 'stderr',
          content: `Ошибка: ${error instanceof Error ? error.message : 'Unknown error'}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(command);
    setCommand('');
  };

  const clearOutput = () => {
    setOutput([]);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
          size="lg"
        >
          <Icon name="Terminal" className="mr-2" size={20} />
          Консоль
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
      <div className="w-full bg-black text-green-400 font-mono shadow-2xl border-t-4 border-red-600" style={{ height: '60vh' }}>
        <div className="bg-gray-900 p-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Terminal" size={20} className="text-red-500" />
            <h2 className="text-lg font-bold text-white">
              Административная консоль сервера
            </h2>
            {currentDir && (
              <span className="text-sm text-gray-400">
                [{currentDir}]
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={clearOutput}
              variant="outline"
              size="sm"
              className="text-white border-gray-600 hover:bg-gray-800"
            >
              <Icon name="Trash2" className="mr-1" size={16} />
              Очистить
            </Button>
            <Button
              onClick={() => setIsVisible(false)}
              variant="outline"
              size="sm"
              className="text-white border-gray-600 hover:bg-gray-800"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        <div
          ref={outputRef}
          className="overflow-y-auto p-4 space-y-1"
          style={{ height: 'calc(60vh - 120px)' }}
        >
          {output.length === 0 && (
            <div className="text-gray-500 text-sm">
              ⚠️ Административная консоль активна. Все команды выполняются напрямую на сервере.
              <br />
              Введите команду для начала работы...
            </div>
          )}
          {output.map((item, index) => (
            <div
              key={index}
              className={`text-sm ${
                item.type === 'stderr'
                  ? 'text-red-400'
                  : item.type === 'system'
                  ? 'text-yellow-400 font-semibold'
                  : 'text-green-400'
              } whitespace-pre-wrap break-words font-mono`}
            >
              {item.content}
            </div>
          ))}
          {isExecuting && (
            <div className="text-yellow-400 animate-pulse text-sm">
              Выполняется...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-3 border-t border-gray-700">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 font-bold">
                $
              </span>
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Введите команду..."
                className="pl-8 bg-black border-gray-700 text-green-400 focus:border-green-500 font-mono"
                disabled={isExecuting}
                autoFocus
              />
            </div>
            <Button
              type="submit"
              disabled={isExecuting || !command.trim()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Icon name="Play" className="mr-1" size={16} />
              Выполнить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminConsole;

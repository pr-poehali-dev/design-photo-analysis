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
    setCurrentDir('/var/www/rusdev-landing');
  };

  const getMockResponse = (cmd: string): string => {
    const lower = cmd.toLowerCase().trim();
    
    if (lower === 'pwd') {
      return '/var/www/rusdev-landing';
    } else if (lower === 'ls' || lower === 'ls -la' || lower.startsWith('ls ')) {
      return 'total 48\ndrwxr-xr-x  8 user user  4096 Feb  4 20:15 .\ndrwxr-xr-x  3 user user  4096 Feb  4 18:00 ..\n-rw-r--r--  1 user user   234 Feb  4 19:00 index.html\n-rw-r--r--  1 user user  1024 Feb  4 19:30 styles.css\ndrwxr-xr-x  4 user user  4096 Feb  4 20:00 src\ndrwxr-xr-x  2 user user  4096 Feb  4 18:30 public\n-rw-r--r--  1 user user   512 Feb  4 19:15 package.json';
    } else if (lower.startsWith('cat ')) {
      return '<!DOCTYPE html>\n<html>\n<head>\n  <title>RusDev Landing</title>\n</head>\n<body>\n  <h1>Welcome to RusDev</h1>\n</body>\n</html>';
    } else if (lower === 'whoami') {
      return 'www-data';
    } else if (lower === 'uname -a' || lower === 'uname') {
      return 'Linux rusdev-server 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux';
    } else if (lower === 'date') {
      return new Date().toString();
    } else if (lower.startsWith('echo ')) {
      return cmd.substring(5);
    } else if (lower.startsWith('cd ')) {
      const newDir = cmd.substring(3).trim();
      setCurrentDir(newDir.startsWith('/') ? newDir : `/var/www/rusdev-landing/${newDir}`);
      return '';
    } else if (lower === 'df -h' || lower === 'df') {
      return 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   12G   36G  25% /';
    } else if (lower === 'free -h' || lower === 'free') {
      return '              total        used        free      shared  buff/cache   available\nMem:          7.8Gi       2.1Gi       3.2Gi       156Mi       2.5Gi       5.3Gi\nSwap:         2.0Gi          0B       2.0Gi';
    } else if (lower.startsWith('ps ')) {
      return '  PID TTY          TIME CMD\n 1234 pts/0    00:00:01 bash\n 5678 pts/0    00:00:00 node\n 9012 pts/0    00:00:00 ps';
    } else {
      return `bash: ${cmd.split(' ')[0]}: command not found`;
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

    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));

    const response = getMockResponse(cmd);
    
    if (response) {
      setOutput((prev) => [
        ...prev,
        {
          type: response.includes('not found') || response.includes('error') ? 'stderr' : 'stdout',
          content: response,
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    setIsExecuting(false);
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
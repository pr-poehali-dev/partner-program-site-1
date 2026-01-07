import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AdBlock {
  id: number;
  code: string;
  position: string;
}

const Index = () => {
  const { toast } = useToast();
  const [adBlocks, setAdBlocks] = useState<AdBlock[]>([
    { id: 1, code: '', position: 'Верхний блок' },
    { id: 2, code: '', position: 'Боковой блок 1' },
    { id: 3, code: '', position: 'Центральный блок' },
    { id: 4, code: '', position: 'Боковой блок 2' },
    { id: 5, code: '', position: 'Нижний блок' }
  ]);

  const [editingBlock, setEditingBlock] = useState<AdBlock | null>(null);
  const [tempCode, setTempCode] = useState('');

  const openEditor = (block: AdBlock) => {
    setEditingBlock(block);
    setTempCode(block.code);
  };

  const saveAdCode = () => {
    if (editingBlock) {
      setAdBlocks(adBlocks.map(block => 
        block.id === editingBlock.id ? { ...block, code: tempCode } : block
      ));
      toast({
        title: "Код сохранен",
        description: `Рекламный код для "${editingBlock.position}" успешно обновлен`,
      });
      setEditingBlock(null);
      setTempCode('');
    }
  };

  const clearAdCode = (id: number) => {
    setAdBlocks(adBlocks.map(block => 
      block.id === id ? { ...block, code: '' } : block
    ));
    toast({
      title: "Код удален",
      description: "Рекламный блок очищен",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Icon name="TrendingUp" size={32} className="text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Партнерские Программы</h1>
          </div>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-5xl font-bold text-foreground leading-tight">
              Зарабатывай в интернете с партнерскими программами
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Максимизируй доход через проверенные партнерские программы и эффективную рекламу
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8">
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать сейчас
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Почему выбирают нас</h3>
            <p className="text-muted-foreground text-lg">Простые решения для максимального заработка</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="DollarSign" size={24} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Высокие выплаты</h4>
              <p className="text-muted-foreground">Получайте стабильный доход от проверенных партнерских программ</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Быстрый старт</h4>
              <p className="text-muted-foreground">Начните зарабатывать уже сегодня без сложных настроек</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="BarChart3" size={24} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Аналитика</h4>
              <p className="text-muted-foreground">Отслеживайте статистику и оптимизируйте доходность</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Рекламные блоки</h3>
            <p className="text-muted-foreground text-lg">Управляйте размещением РСЯ на вашем сайте</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {adBlocks.map((block) => (
              <Card key={block.id} className="p-6 transition-all hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        block.code ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        <Icon name={block.code ? "CheckCircle2" : "Circle"} size={20} 
                          className={block.code ? 'text-primary' : 'text-muted-foreground'} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{block.position}</h4>
                        <p className="text-sm text-muted-foreground">
                          {block.code ? 'Код добавлен' : 'Код не добавлен'}
                        </p>
                      </div>
                    </div>
                    
                    {block.code && (
                      <div className="bg-muted/50 rounded-lg p-4 mt-3">
                        <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all">
                          {block.code.substring(0, 150)}{block.code.length > 150 ? '...' : ''}
                        </pre>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openEditor(block)}>
                          <Icon name={block.code ? "Edit" : "Plus"} size={16} className="mr-1" />
                          {block.code ? 'Изменить' : 'Добавить'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Редактор кода РСЯ</DialogTitle>
                          <DialogDescription>
                            Вставьте код для блока "{block.position}"
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="ad-code">Код рекламного блока</Label>
                            <Textarea
                              id="ad-code"
                              placeholder="<!-- Вставьте код РСЯ здесь -->"
                              className="min-h-[300px] font-mono text-sm"
                              value={tempCode}
                              onChange={(e) => setTempCode(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <DialogTrigger asChild>
                              <Button variant="outline">Отмена</Button>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                              <Button onClick={saveAdCode}>
                                <Icon name="Save" size={16} className="mr-1" />
                                Сохранить
                              </Button>
                            </DialogTrigger>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {block.code && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => clearAdCode(block.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 max-w-6xl mx-auto">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Info" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Как использовать редактор</h4>
                  <p className="text-sm text-muted-foreground">
                    Нажмите "Добавить" или "Изменить", вставьте код РСЯ от Яндекса и сохраните. 
                    Код будет автоматически отображаться в соответствующем блоке на сайте.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-4xl font-bold">Готовы начать зарабатывать?</h3>
            <p className="text-xl text-muted-foreground">
              Присоединяйтесь к тысячам успешных партнеров уже сегодня
            </p>
            <Button size="lg" className="text-lg px-8">
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать прямо сейчас
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={24} className="text-primary" />
              <span className="font-semibold">Партнерские Программы</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Все права защищены
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

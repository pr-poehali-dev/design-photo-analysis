import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RusDev
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">
              Главная
            </a>
            <a href="#platform" className="text-muted-foreground hover:text-foreground transition-colors">
              О платформе
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Тарифы
            </a>
            <a href="#academy" className="text-muted-foreground hover:text-foreground transition-colors">
              Академия
            </a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Начать бесплатно
          </Button>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Платформа для{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  предпринимателей
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Всё необходимое для старта и роста вашего бизнеса: CRM-система, маркетплейс товаров и
                персональное обучение на базе ИИ
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="Rocket" className="mr-2" size={20} />
                  Начать сейчас
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="PlayCircle" className="mr-2" size={20} />
                  Смотреть демо
                </Button>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-muted-foreground">Предпринимателей</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1200+</div>
                  <div className="text-sm text-muted-foreground">Успешных бизнесов</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Удовлетворённость</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
              <img
                src="https://cdn.poehali.dev/projects/abea05b0-9c92-44da-8cba-9bb261b68408/files/c1bf4506-f11c-4f4c-ae7f-25b90a232ca2.jpg"
                alt="Business team"
                className="relative rounded-3xl shadow-2xl w-full animate-fade-in"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">О платформе RusDev</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Три мощных инструмента в одной экосистеме для вашего успеха
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-xl group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Database" size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl">CRM-система</CardTitle>
                <CardDescription className="text-base">
                  Управляйте клиентами и продажами
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Автоматизация воронки продаж
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm text-muted-foreground">База клиентов с историей</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Аналитика и отчёты в реальном времени
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm text-muted-foreground">Интеграция с мессенджерами</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-all hover:shadow-xl group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/60 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="ShoppingBag" size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl">Маркетплейс</CardTitle>
                <CardDescription className="text-base">
                  Продавайте товары без комиссий
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Витрина с вашим брендингом
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Приём платежей онлайн
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Управление заказами и доставкой
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-secondary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Без скрытых комиссий
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-xl group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="GraduationCap" size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl">Академия бизнеса</CardTitle>
                <CardDescription className="text-base">
                  ИИ-наставник для вашего роста
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Персональный план обучения
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    ИИ-анализ вашего бизнеса
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Рекомендации в реальном времени
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Поддержка 24/7
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Выберите свой тариф</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Прозрачные цены без скрытых платежей. Начните бесплатно уже сегодня
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-2xl">Старт</CardTitle>
                <CardDescription>Для начинающих предпринимателей</CardDescription>
                <div className="pt-4">
                  <span className="text-5xl font-bold">0₽</span>
                  <span className="text-muted-foreground">/месяц</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Начать бесплатно
                </Button>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">CRM до 100 клиентов</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">5 товаров в маркетплейсе</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Базовое обучение с ИИ</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Email поддержка</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-2xl relative overflow-hidden hover:shadow-3xl transition-all scale-105">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                Популярный
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Профи</CardTitle>
                <CardDescription>Для растущего бизнеса</CardDescription>
                <div className="pt-4">
                  <span className="text-5xl font-bold">2 990₽</span>
                  <span className="text-muted-foreground">/месяц</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Попробовать 14 дней
                </Button>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">CRM до 1000 клиентов</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Безлимит товаров</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Полное обучение с ИИ</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Приоритетная поддержка</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Расширенная аналитика</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Интеграции API</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-2xl">Бизнес</CardTitle>
                <CardDescription>Для крупных компаний</CardDescription>
                <div className="pt-4">
                  <span className="text-5xl font-bold">9 990₽</span>
                  <span className="text-muted-foreground">/месяц</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Связаться с нами
                </Button>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Безлимит клиентов</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Мультимаркетплейс</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Персональный ИИ-наставник</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Dedicated поддержка</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Белый label</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span className="text-sm">Индивидуальные функции</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="academy" className="py-20 px-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold">Академия бизнеса RusDev</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Индивидуальное обучение на базе ИИ
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Забудьте про стандартные курсы! Наша ИИ-система анализирует ваш бизнес и создаёт
                персональную программу развития именно для вас.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-card rounded-xl border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Brain" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Персональный подход</h3>
                    <p className="text-sm text-muted-foreground">
                      ИИ анализирует вашу нишу, опыт и цели для создания уникального плана обучения
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-card rounded-xl border">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Lightbulb" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Живые рекомендации</h3>
                    <p className="text-sm text-muted-foreground">
                      Получайте советы и стратегии в режиме реального времени на основе данных вашего бизнеса
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-card rounded-xl border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="TrendingUp" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Постоянное развитие</h3>
                    <p className="text-sm text-muted-foreground">
                      Программа адаптируется под ваш прогресс, предлагая новые вызовы и задачи
                    </p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Начать обучение бесплатно
              </Button>
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl"></div>
              <img
                src="https://cdn.poehali.dev/projects/abea05b0-9c92-44da-8cba-9bb261b68408/files/b2ab118b-8d49-4eda-9bc5-3814d804caf4.jpg"
                alt="AI Learning"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Готовы начать свой путь к успеху?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам предпринимателей, которые уже растут вместе с RusDev
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Icon name="Rocket" className="mr-2" size={20} />
              Начать бесплатно
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Задать вопрос
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <span className="text-xl font-bold">RusDev</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Платформа для роста вашего бизнеса с помощью современных технологий и ИИ
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Продукты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>CRM-система</div>
                <div>Маркетплейс</div>
                <div>Академия бизнеса</div>
                <div>API</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>О нас</div>
                <div>Блог</div>
                <div>Карьера</div>
                <div>Контакты</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Документация</div>
                <div>FAQ</div>
                <div>Статус сервиса</div>
                <div>Помощь</div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2026 RusDev. Все права защищены.
            </div>
            <div className="flex gap-4">
              <Icon name="Github" size={20} className="text-muted-foreground hover:text-foreground cursor-pointer" />
              <Icon name="Twitter" size={20} className="text-muted-foreground hover:text-foreground cursor-pointer" />
              <Icon name="Linkedin" size={20} className="text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

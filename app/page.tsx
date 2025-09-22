import { Container } from '@/src/components/ui/Container'
import { Button } from '@/src/components/ui/Button'
import { Card } from '@/src/components/ui/Card'
import { Badge } from '@/src/components/ui/Badge'

export default function Home() {
  return (
    <div className="py-12">
      <Container>
        <div className="text-center mb-12">
          <Badge variant="success" className="mb-4">Beta Launch</Badge>
          <h1 className="text-5xl font-bold text-forest mb-4">
            Master AI Agent Development
          </h1>
          <p className="text-xl text-ink/70 mb-8 max-w-2xl mx-auto">
            Learn, practice, and excel with interactive tools, comprehensive tutorials, and competitive leaderboards.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary">Get Started</Button>
            <Button variant="ghost">Learn More</Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <h3 className="text-xl font-semibold text-forest mb-2">Interactive Tools</h3>
            <p className="text-ink/70">Build and test AI agents with our comprehensive toolset.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-forest mb-2">Learn & Practice</h3>
            <p className="text-ink/70">Master concepts with tutorials and hands-on quizzes.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-forest mb-2">Compete & Excel</h3>
            <p className="text-ink/70">Join leaderboards and showcase your expertise.</p>
          </Card>
        </div>
        
        <div className="mt-16 p-8 rounded-xl2 leaderboard-gradient text-paper text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-lg mb-6 opacity-90">Join thousands of developers mastering AI agents.</p>
          <Button variant="white">Start Your Journey</Button>
        </div>
      </Container>
    </div>
  )
}

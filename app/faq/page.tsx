import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: 'Gold Price FAQ | Frequently Asked Questions',
  description: 'Find answers to frequently asked questions about gold prices, investing in gold, gold calculators, and precious metals.',
  keywords: ['gold price faq', 'gold questions', 'investing in gold faq', 'gold calculator help'],
  openGraph: {
    title: 'Gold Price FAQ | Frequently Asked Questions',
    description: 'Find answers to frequently asked questions about gold prices and investing.',
  },
}

const faqs = [
  {
    question: 'How much is your gold worth?',
    answer: 'The value of your gold depends on the current market price, weight, and purity. Use our Gold Price Calculator to determine the exact value based on real-time market prices.'
  },
  {
    question: 'How is the gold price calculated?',
    answer: 'Gold prices are determined by global market forces including supply and demand, currency values, central bank policies, and geopolitical events. The spot price is set in London and New York trading sessions.'
  },
  {
    question: 'What is the difference between gold spot price and retail price?',
    answer: 'The spot price is the current market price for immediate delivery. Retail prices include premiums for fabrication, distribution, and dealer margins, typically 3-8% above spot.'
  },
  {
    question: 'How do I convert between ounces and grams?',
    answer: '1 troy ounce = 31.1035 grams. To convert ounces to grams, multiply by 31.1035. To convert grams to ounces, divide by 31.1035.'
  },
  {
    question: 'What affects gold prices?',
    answer: 'Gold prices are influenced by: USD strength, interest rates, inflation, geopolitical tensions, central bank buying, mining supply, and jewelry demand.'
  },
  {
    question: 'Is gold a good investment?',
    answer: 'Gold is often considered a safe-haven asset and portfolio diversifier. It can hedge against inflation and currency devaluation, but does not produce income like dividends or interest.'
  },
  {
    question: 'What are the different ways to invest in gold?',
    answer: 'You can invest in physical gold (coins, bars, jewelry), gold ETFs, gold mining stocks, gold futures, or gold-backed cryptocurrencies.'
  },
  {
    question: 'How do I calculate the value of scrap gold?',
    answer: 'Multiply the weight by the purity percentage (karat/24), then multiply by the current gold price per gram. Use our calculator for precise valuations.'
  },
]

export default function FAQPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-neutral-400 text-lg">
            Find answers to common questions about gold prices and investing
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-xl">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-300 leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

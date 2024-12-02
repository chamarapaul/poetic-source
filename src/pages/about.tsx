// pages/about.tsx
import {
  ArrowRight,
  BookOpenText,
  Cpu,
  ScrollText,
  SquareCode,
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <Layout>
      <Container className="py-8">
        {/* Hero Section */}
        <section className="mb-12 space-y-5 md:space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
            About Poetic Source
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-mono">
            Code and poetry intertwined: dual expressions of universal patterns
          </p>

          <div className="absolute h-1 bg-gradient-to-r from-blue-500 to-blue-600 w-24" />
        </section>

        {/* Main Content */}
        <section className="space-y-8 md:space-y-12">
          {/* Vision */}
          <div className="prose max-w-none">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Poetry is one of humanity&apos;s oldest art forms, giving voice to
              our deepest thoughts and feelings through creative expression.
              Similarly, programming languages enable us to instruct machines
              through precise, structured commands. While poems speak to the
              human heart, programs speak to computers — each in their own
              unique language.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
              A "code poem" brings these worlds together: it is both a valid
              program that machines can run and a carefully crafted poem that
              humans can contemplate. Each piece maintains technical precision
              while expressing poetic beauty through its algorithms and
              structures.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
              This project reveals the inherent art in computer science,
              uncovering profound truths hidden within our algorithms. Working
              with generative AI, I&apos;m exploring how programming languages
              can intersect seamlessly with poetry, representing a unique blend
              of computational thinking and creative imagination.
            </p>
          </div>

          {/* Core Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <SquareCode className="w-5 h-5 mr-2" />
                  Valid Code
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:space-y-2 md:mb-4 pt-0">
                <p className="text-gray-600">
                  Each poem strives to maintain code validity while expressing
                  deeper meanings through its algorithms and comments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <ScrollText className="w-5 h-5 mr-2" />
                  Poetic Forms
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:space-y-2 md:mb-4 pt-0">
                <p className="text-gray-600">
                  Six Poetic forms — Ghazal, Haiku, Koans, Rubaʿi, Tanka, and
                  Free Verse — each bring their own structure and rhythm to the
                  code.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <BookOpenText className="w-5 h-5 mr-2" />
                  Context & Meaning
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:space-y-2 md:mb-4 pt-0">
                <p className="text-gray-600">
                  Each piece includes philosophical and technical commentary,
                  examining the programming concepts and poetic elements
                  embedded in the code.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <Cpu className="w-5 h-5 mr-2" />
                  AI Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:space-y-2 md:mb-4 pt-0">
                <p className="text-gray-600">
                  The collection features poems created by humans and through
                  human-AI collaboration, demonstrating new possibilities in
                  artistic expression.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Origins */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
              Origins
            </h2>
            <div className="space-y-3 md:space-y-4 text-gray-700">
              <p>
                Poetic Source began with an observation: fundamental patterns in
                computer science mirror the natural world in fascinating ways.
                Object-oriented concepts parallel biological evolution, garbage
                collection algorithms reflect Earth&apos;s closed metabolic
                systems, and recursive functions echo the fractals found in
                ferns and river networks. These parallels suggest that our
                programming paradigms might not be mere inventions, but
                discoveries of principles inherent in reality itself.
              </p>
              <p>
                Just as poets find their verses in reflecting life&apos;s
                moments — a falling leaf, a chance encounter, a remembered dream
                — these unexpected harmonies between computation and nature
                suggest an underlying elegance. Poetic Source explores this
                connection, blending structured verse and code, while AI
                collaboration enriches the process and helps to discover new
                ways to transform technical concepts into poetic expression.
              </p>
            </div>
          </div>

          {/* Share Your Poetry */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
              Share Your Poetry
            </h2>
            <div className="space-y-3 md:space-y-4 text-gray-700">
              <p>
                Inspired to create your own code poetry? I&apos;d love to see
                what you create! To contribute a poem, please visit the{' '}
                <a
                  href="https://github.com/chamarapaul/poetic-source#poetic-source"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  GitHub repo
                </a>{' '}
                and follow the guidelines in the README.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-6">
            <p className="text-base md:text-lg text-gray-700 mb-6">
              Discover the beauty that emerges when we view code through a
              poetic lens.
            </p>
            <Link
              href="/poems"
              className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore the Collection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

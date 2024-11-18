// pages/about.tsx
import React from 'react';
import Link from 'next/link';
import { Code, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';

export default function AboutPage() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <section className="text-center mb-8 md:mb-12 relative">
                    <div className="pt-4 md:pt-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                            About Poetic Source
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            Exploring the creative possibilities that emerge when we treat code as a form of poetic expression.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section className="space-y-8 md:space-y-12">
                    {/* Vision */}
                    <div className="prose max-w-none">
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            This project is a creative challenge to reveal the inherent poetry in computer science,
                            uncovering profound truths hiding within our algorithms. Working in collaboration with
                            generative AI, I&apos;m exploring how artificial intelligence can  help discover new forms of
                            artistic expression at the intersection of code and poetry. Each piece in this collection
                            is AI-generated, representing a unique blend of computational thinking and poetic imagination.
                        </p>
                    </div>

                    {/* Core Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <Card>
                            <CardHeader className="p-4 md:p-6">
                                <CardTitle className="flex items-center text-lg md:text-xl">
                                    <Code className="w-5 h-5 mr-2" />
                                    Valid Code
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 md:space-y-2 md:mb-4 pt-0">
                                <p className="text-gray-600">
                                    Each poem strives to maintain code validity while expressing deeper
                                    meanings through carefully chosen algorithms and structures.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="p-4 md:p-6">
                                <CardTitle className="flex items-center text-lg md:text-xl">
                                    <Code className="w-5 h-5 mr-2" />
                                    Poetic Forms
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 md:space-y-2 md:mb-4 pt-0">
                                <p className="text-gray-600">
                                    Poetic forms such as Ghazal, Haiku, Koans, Rubaʿi, Tanka, and Free
                                    Verse are explored, each bringing its own structure and rhythm to the code.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="p-4 md:p-6">
                                <CardTitle className="flex items-center text-lg md:text-xl">
                                    <Code className="w-5 h-5 mr-2" />
                                    Context & Meaning
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 md:space-y-2 md:mb-4 pt-0">
                                <p className="text-gray-600">
                                    Each piece includes philosophical and technical notes, exploring both the programming
                                    concepts and deeper meanings embedded in the code.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="p-4 md:p-6">
                                <CardTitle className="flex items-center text-lg md:text-xl">
                                    <Code className="w-5 h-5 mr-2" />
                                    AI Collaboration
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 md:space-y-2 md:mb-4 pt-0">
                                <p className="text-gray-600">
                                    These poems represent an exploration of how artificial intelligence can
                                    help create new forms of artistic expression.
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
                                This project emerged from a desire to challenge conventional boundaries between
                                technical and poetic ways of understanding reality. I became fascinated by how
                                fundamental patterns in computer science seem to mirror the natural world: garbage
                                collection algorithms reflect Earth&apos;s closed metabolic systems, object-oriented
                                concepts parallel biological evolution, and recursive functions echo the fractal
                                patterns found in ferns and river networks.
                            </p>
                            <p>
                                These parallels suggest something profound: perhaps our programming paradigms aren&apos;t
                                just human inventions, but discoveries of patterns inherent in reality itself. Through
                                code poetry, I&apos;m exploring this intersection where computational thinking meets natural
                                wisdom, developing a framework that embraces both the mathematical precision of
                                computer science and the intuitive truth of poetic expression.
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
                                Inspired to create your own code poetry? I&apos;d love to see what you create! To contribute your poem, please visit the <a
                                    href="https://github.com/chamarapaul/poetic-source#contributing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    GitHub repo
                                </a> and follow the guidelines in the README.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center py-6 md:py-8">
                        <p className="text-base md:text-lg text-gray-700 mb-4">
                            Join me in exploring the beauty that emerges when we view code through a poetic lens.
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
            </div>
        </Layout>
    );
}
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import SyntaxHighlighter from "react-syntax-highlighter";


const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState("");
  const [description, setDescription] = useState("");
  const [composedQuery, setComposedQuery] = useState<String>("");

  // console.log("Streamed response: ", composedQuery);

  const prompt =
    `Generate NebulaGraph Cypher Query with inline comments on schema& description.
For NebulaGraph Cypher, requirements:
1. the variable's property for vertex should have its type specified
2. DO NOT use Cypher "MERGE", or Cypher "CREATE" clause because NebulaGraph's DML is not Cypher

Input example:
---
Schema:
vertex tags: Person(name string, age int), Movie(title string, year int), edge types: watch_and_rate(rate int).
Description:
Get the name of the person who has watched the movie "The Matrix" and rated it 5 stars.
Query:
// Get the name of the person who has watched the movie "The Matrix" and rated it 5 stars.
MATCH (v:Person)-[e:watch_and_rate]->(v1:Movie)
    WHERE v1.Movie.title == "The Matrix" AND e.rate == 5
RETURN v.Person.name
---

Schema:
${schema}
Description:
${description}
Query:`;

  const composeQuery = async (e: any) => {
    e.preventDefault();
    setComposedQuery("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setComposedQuery((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>nGQL GPT Composer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/wey-gu/NebulaGraph-GPT"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          Compose NebulaGraph nGQL Query in seconds
        </h1>
        {/* <p className="text-slate-500 mt-5">10,312 queries generated so far.</p> */}
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Write your schema
              {/* <span className="text-slate-500">
                (or drop your DDL queries)
              </span> */}
              .
            </p>
          </div>
          <textarea
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. vertex tags: Person(name string, age int), Movie(title string, year int), edge types: follow(degree double), directed(start_year int), watch_and_rate(rate int)."
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Describe what you would like to query.</p>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. Recommend friends for a person to follow, based on the movies they have watched and both rated highly."
            }
          />

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => composeQuery(e)}
            >
              Compose your nGQL Query &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {composedQuery && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your Queries
                    </h2>
                  </div>
                  {/* text should be Left aligned */}
                  <div className="space-y-8 flex flex-col mx-auto" style={{ textAlign: "left" }}>
                    <SyntaxHighlighter language="cypher">
                      {composedQuery.toString()}
                    </SyntaxHighlighter>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

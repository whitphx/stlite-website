"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Github,
  ExternalLink,
  Globe,
  Cpu,
  Server,
  Cog,
  Layout,
  Share2,
  Globe2,
  Zap,
  Code2,
  Laptop,
  Rocket,
  ArrowRight,
  Play,
  X,
  Lock,
  Heart,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock function to check network speed and type
const checkNetwork = (): { highSpeed: boolean; notPayAsYouGo: boolean } => {
  return { highSpeed: true, notPayAsYouGo: true };
};

// Mock function to load Stlite module
const loadStliteModule = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Stlite module loaded");
      resolve();
    }, 1000);
  });
};

// Mock function to execute Stlite code
const executeStliteCode = async (code: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Stlite code executed:", code);
      resolve(
        "Stlite app executed successfully! This is where your app output would appear.",
      );
    }, 1000);
  });
};

export function StliteLandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isStliteLoaded, setIsStliteLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appOutput, setAppOutput] = useState<string | null>(null);
  const [showLoadPrompt, setShowLoadPrompt] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("web-sharing");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [code, setCode] = useState(`import streamlit as st
import pandas as pd

st.title("Stlite Demo")

data = pd.DataFrame({
  'x': [1, 2, 3, 4, 5],
  'y': [10, 20, 15, 25, 30]
})

st.line_chart(data)
`);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const { highSpeed, notPayAsYouGo } = checkNetwork();
    if (highSpeed && notPayAsYouGo) {
      loadStliteModule().then(() => setIsStliteLoaded(true));
    }

    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRunApp = useCallback(async () => {
    if (!isStliteLoaded) {
      setShowLoadPrompt(true);
      return;
    }

    setIsLoading(true);
    try {
      const output = await executeStliteCode(code);
      setAppOutput(output);
      setIsPreviewVisible(true);
    } catch (error) {
      setAppOutput("Error executing Stlite app");
    } finally {
      setIsLoading(false);
    }
  }, [isStliteLoaded, code]);

  const handleLoadStlite = useCallback(async () => {
    setShowLoadPrompt(false);
    setIsLoading(true);
    await loadStliteModule();
    setIsStliteLoaded(true);
    setIsLoading(false);
    handleRunApp();
  }, [handleRunApp]);

  const handleHidePreview = () => {
    setIsPreviewVisible(false);
  };

  const techStackLayers = [
    { id: "browser", name: "Web Browser / Desktop App", icon: Globe },
    { id: "wasm", name: "WebAssembly Runtime", icon: Cpu },
    { id: "pyodide", name: "Pyodide (Wasm CPython)", icon: Code2 },
    { id: "pythonserver", name: "Stlite Python Server", icon: Server },
    { id: "webworker", name: "WebWorker", icon: Cog },
    { id: "frontend", name: "Stlite Frontend", icon: Layout },
  ];

  const deploymentOptions = [
    {
      id: "web-sharing",
      title: "Stlite Sharing",
      icon: Share2,
      description:
        "A web platform designed for developing and sharing Streamlit apps powered by Stlite. Perfect for quick prototypes and demonstrations.",
      image: "/placeholder.svg?height=200&width=400",
      getStarted: (
        <>
          <p className="mb-4">To get started with Stlite Sharing:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Visit the Stlite Sharing platform</li>
            <li>Create a new project</li>
            <li>Write your Streamlit app code</li>
            <li>Click "Run" to see your app in action</li>
            <li>Share the unique URL with others</li>
          </ol>
          <Button className="bg-pink-600 text-white hover:bg-pink-700">
            Try Stlite Sharing
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      ),
    },
    {
      id: "self-hosted",
      title: "Self-hosted Web Pages",
      icon: Globe2,
      description:
        "Host your own web pages by importing the Stlite code and executing your Streamlit apps. Works even on static web pages, giving you full control over your deployment.",
      image: "/placeholder.svg?height=200&width=400",
      getStarted: (
        <>
          <p className="mb-4">To self-host your Stlite app:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Create a new HTML file</li>
            <li>Include the Stlite JavaScript library</li>
            <li>Write your Streamlit app code</li>
            <li>Use the stlite.mount() function to run your app</li>
          </ol>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`<script src="https://cdn.jsdelivr.net/npm/@stlite/mountable@0.35.0/build/stlite.js"></script>

<script>
stlite.mount(\`
import streamlit as st

st.write("Hello, Stlite!")
\`)
</script>`}</code>
            </pre>
          </div>
          <Button className="bg-pink-600 text-white hover:bg-pink-700">
            View Full Documentation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      ),
    },
    {
      id: "desktop-app",
      title: "Desktop Apps",
      icon: Laptop,
      description:
        "Package your Streamlit app into a desktop application executable. Ideal for offline use or distribution to users who prefer native applications.",
      image: "/placeholder.svg?height=200&width=400",
      getStarted: (
        <>
          <p className="mb-4">To create a desktop app with Stlite:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Set up a new Electron project</li>
            <li>Include the Stlite library in your project</li>
            <li>Create your Streamlit app</li>
            <li>Configure Electron to load your Stlite app</li>
            <li>Package and distribute your desktop app</li>
          </ol>
          <Button className="bg-pink-600 text-white hover:bg-pink-700">
            Desktop App Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </>
      ),
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-500">
      <header
        className={`px-4 lg:px-6 h-14 flex items-center fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrollPosition > 100 ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <a className="flex items-center justify-center" href="#">
          <span
            className={`font-bold text-2xl ${
              scrollPosition > 100 ? "text-pink-600" : "text-white"
            }`}
          >
            Stlite
          </span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {[
            "features",
            "streamlit-and-stlite",
            "deployment-options",
            "get-started",
            "how-it-works",
            "community",
          ].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                scrollPosition > 100
                  ? "text-gray-600 hover:text-pink-600"
                  : "text-white hover:text-pink-100"
              }`}
            >
              {section
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </nav>
      </header>
      <main className="flex-1 mt-14">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left lg:space-y-6">
                <div
                  className={`space-y-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                    Stlite: In-browser Streamlit
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl mx-auto lg:mx-0">
                    Run Streamlit apps directly in your browser. No server
                    required. Prototype and share with ease.
                  </p>
                </div>
                <div
                  className={`flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <Button
                    className="bg-white text-pink-600 hover:bg-gray-100"
                    onClick={() => scrollToSection("get-started")}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-pink-600 text-white border-white hover:bg-pink-700"
                    onClick={() => scrollToSection("features")}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div
                className={`relative transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl blur-2xl" />
                <div className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm text-gray-400">
                      stlite_demo.py
                    </span>
                  </div>
                  <div className="p-4 space-y-4">
                    <div
                      className={`grid gap-4 ${isPreviewVisible ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
                    >
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-40 bg-transparent text-gray-300 font-mono text-sm p-2 rounded resize-none outline-none"
                      />
                      {isPreviewVisible && (
                        <div className="relative">
                          <div className="bg-white p-2 rounded-lg h-40 overflow-auto">
                            <p className="text-gray-700 text-sm">{appOutput}</p>
                          </div>
                          <Button
                            onClick={handleHidePreview}
                            className="absolute top-2 right-2 h-6 w-6 p-0 bg-gray-200 hover:bg-gray-300"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Hide preview</span>
                          </Button>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={handleRunApp}
                      disabled={isLoading}
                      className="w-full bg-pink-600 text-white hover:bg-pink-700"
                    >
                      {isLoading ? "Running..." : "Run App"}
                      <Play className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
              Key Features of Stlite
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg transition-all duration-300 hover:bg-pink-50">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-full">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  Browser-Native Execution
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  Run Streamlit apps directly in your browser without any
                  server-side dependencies, enabling instant prototyping and
                  sharing.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg transition-all duration-300 hover:bg-pink-50">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-full">
                  <Zap className="h-6 w-4" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  Lightning-Fast Development
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  Leverage Stlite Sharing for rapid prototyping and seamless
                  collaboration. Develop, iterate, and share your data apps with
                  unprecedented speed and ease.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg transition-all duration-300 hover:bg-pink-50">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-full">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  Streamlit Compatibility
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  Harness the full power of Streamlit's intuitive API in a
                  serverless environment, maintaining consistency with your
                  existing Streamlit workflows.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg transition-all duration-300 hover:bg-pink-50">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-full">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  Effortless Deployment
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  Deploy your apps with ease, whether through Stlite Sharing,
                  self-hosted web pages, or as desktop applications. No need for
                  server-side Python runtime setup, simplifying the deployment
                  process.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg transition-all duration-300 hover:bg-pink-50">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-full">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  Offline Capability & Privacy
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  Create apps that work offline as PWAs or desktop applications,
                  ensuring data privacy and enhancing security by keeping
                  sensitive information local.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg transition-all duration-300 hover:bg-pink-50">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-full">
                  <Laptop className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  Versatile Usage
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  From web applications to desktop software, Stlite adapts to
                  your needs. Perfect for creating interactive data
                  visualizations, prototypes, or full-fledged applications.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="streamlit-and-stlite"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Heart className="h-12 w-12 text-pink-600" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                Streamlit and Stlite
              </h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stlite is a derivative project that builds upon the excellent
                foundation laid by Streamlit. While Streamlit is a powerful and
                versatile framework for creating data applications, Stlite
                extends its capabilities to cover use cases that Streamlit
                wasn't originally designed for.
              </p>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We have deep respect for Streamlit and recognize its strengths
                in server-based deployments. Stlite complements Streamlit by
                enabling browser-native execution, allowing developers to run
                Streamlit apps without a dedicated server. This opens up new
                possibilities for prototyping, sharing, and deploying Streamlit
                applications.
              </p>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                By choosing Stlite, you're not moving away from Streamlit, but
                rather expanding the horizons of what's possible with your
                Streamlit applications.
              </p>
            </div>
          </div>
        </section>
        <section
          id="deployment-options"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
              Deployment Options
            </h2>
            <div className="grid gap-6 items-stretch lg:grid-cols-3">
              {deploymentOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex flex-col items-center space-y-4 text-center p-6 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-pink-50"
                >
                  <div className="p-2 bg-pink-100 text-pink-600 rounded-full">
                    <option.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {option.title}
                  </h3>
                  <img
                    src={option.image}
                    alt={`${option.title} illustration`}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-500 flex-grow">
                    {option.description}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setActiveTab(option.id);
                      scrollToSection("get-started");
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="get-started"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
              Get Started
            </h2>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-3xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-3">
                {deploymentOptions.map((option) => (
                  <TabsTrigger
                    key={option.id}
                    value={option.id}
                    className="text-sm sm:text-base"
                  >
                    {option.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {deploymentOptions.map((option) => (
                <TabsContent
                  key={option.id}
                  value={option.id}
                  className="mt-6 bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
                  {option.getStarted}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
              How Stlite Works: Under the Hood
            </h2>
            <div className="grid gap-6 items-start lg:grid-cols-2">
              <div className="flex flex-col space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  The Technology Behind Stlite
                </h3>
                <p className="text-gray-500">
                  Stlite leverages cutting-edge web technologies to bring
                  Streamlit apps directly to your browser or desktop. Here's a
                  visual representation of the technical stack:
                </p>
                <div className="w-full aspect-square">
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full"
                    aria-labelledby="tech-stack-title tech-stack-desc"
                  >
                    <title id="tech-stack-title">Stlite Technical Stack</title>
                    <desc id="tech-stack-desc">
                      A visual representation of Stlite's technical stack,
                      showing the layers from Web Browser / Desktop App to
                      Stlite Frontend as stacked cards.
                    </desc>

                    <defs>
                      <linearGradient
                        id="card-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#f8f9fa" />
                        <stop offset="100%" stopColor="#e9ecef" />
                      </linearGradient>
                    </defs>

                    {techStackLayers.map((layer, index) => (
                      <g
                        key={layer.id}
                        transform={`translate(200, ${250 - index * 40}) rotate(-30) skewX(20)`}
                        onMouseEnter={() => setHoveredLayer(layer.id)}
                        onMouseLeave={() => setHoveredLayer(null)}
                        className="transition-transform duration-300 ease-in-out"
                        style={{
                          transform:
                            hoveredLayer === layer.id
                              ? `translate(200px, ${250 - index * 40}px) rotate(-30deg) skewX(20deg) scale(1.05)`
                              : `translate(200px, ${250 - index * 40}px) rotate(-30deg) skewX(20deg)`,
                        }}
                      >
                        <rect
                          x="-100"
                          y="-25"
                          width="200"
                          height="50"
                          fill={
                            hoveredLayer === layer.id
                              ? "rgb(255,127,127)"
                              : "url(#card-gradient)"
                          }
                          stroke="#ced4da"
                          strokeWidth="2"
                          rx="5"
                        />
                        <layer.icon
                          x="-90"
                          y="-12"
                          className="w-6 h-6 text-pink-600"
                        />
                        <text x="-75" y="5" fontSize="12" fill="#495057">
                          {layer.name}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                {techStackLayers.map((layer) => (
                  <div
                    key={layer.id}
                    className={`flex items-start space-x-4 p-2 rounded-lg transition-colors duration-300 ease-in-out ${
                      hoveredLayer === layer.id ? "bg-pink-50" : ""
                    }`}
                    onMouseEnter={() => setHoveredLayer(layer.id)}
                    onMouseLeave={() => setHoveredLayer(null)}
                  >
                    <div className="p-2 bg-pink-100 text-pink-600 rounded-full">
                      <layer.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{layer.name}</h4>
                      <p className="text-sm text-gray-500">
                        {layer.id === "frontend" &&
                          "The user interface layer that renders Streamlit components and manages user interactions."}
                        {layer.id === "webworker" &&
                          "Manages the Pyodide runtime and facilitates communication between the Stlite frontend and the Python server."}
                        {layer.id === "pythonserver" &&
                          "A customized Streamlit server that runs entirely in the browser, enabling Streamlit apps without a traditional backend."}
                        {layer.id === "pyodide" &&
                          "A WebAssembly-based Python runtime that allows Python code execution directly in the browser or desktop environment."}
                        {layer.id === "wasm" &&
                          "A high-performance execution environment for running compiled code in web browsers, enabling near-native speed."}
                        {layer.id === "browser" &&
                          "Stlite runs in modern web browsers or as a desktop application using Electron, providing flexibility in deployment and usage."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="community"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-white">
              Join Our Community
            </h2>
            <div className="flex flex-col items-center space-y-4 text-center">
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stlite is an open-source project. We welcome contributions and
                feedback from the community.
              </p>
              <div className="space-x-4">
                <Button className="bg-white text-pink-600 hover:bg-gray-100">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-pink-600"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Discord
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 w-full bg-white border-t border-gray-200">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <p className="text-xs text-gray-500">
              © 2023 Stlite. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <a
                className="text-xs text-gray-500 hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="text-xs text-gray-500 hover:underline underline-offset-4"
                href="#"
              >
                Privacy
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

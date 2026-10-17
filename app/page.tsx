export const dynamic = "force-dynamic";

import clientPromise from "@/lib/mongodb";

type Project = {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl: string;
};

export default async function Home() {
  let projects: Project[] = [];

  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const data = await db
      .collection("projects")
      .find({})
      .toArray();

    projects = data.map((item) => ({
      _id: item._id.toString(),
      title: item.title,
      description: item.description,
      tech: item.tech ?? [],
      githubUrl: item.githubUrl ?? "",
      demoUrl: item.demoUrl ?? "",
    }));
  } catch (error) {
    console.error("프로젝트 조회 오류:", error);
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <a href="#" className="text-xl font-bold">
          R<span className="text-cyan-400">.</span>
        </a>
        <div className="flex gap-6 text-sm text-zinc-400">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-5 font-mono text-sm text-cyan-400">
          INFORMATION SECURITY / 정보보호학전공
        </p>
        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
          안녕하세요. 
          <br />
          중부대 정보보호학과 재학중인
          <br />
          2학년 황승민입니다.
          <br />
          <span className="text-zinc-500">여기는 개인 포트폴리오입니다</span>
        </h1>
        <p className="mt-7 max-w-xl leading-7 text-zinc-400">
          모의해킹 전문가를 목표로 다양한 보안 기술과 웹 개발을 현재 공부중입니다.<br />
          직접 실습도 해보고 모르는게 있으면 AI 및 피드백을 통해 배우고 있습니다. <br />
          해당 포트폴리오 tailwind css 부문에서 AI 참조를 좀 했습니다.
        </p>
        <a
          href="#projects"
          className="mt-8 inline-block rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-black"
        >
          프로젝트 보기
        </a>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-sm text-cyan-400">01 / ABOUT</p>
        <h2 className="mt-3 text-3xl font-bold">About Me</h2>
        <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
          현재는 Linux, 프로그래밍, 웹 보안을 꾸준히 학습하고 있습니다. <br />
          자격증 취득도 여러 가지 준비를 하고 있습니다 (리눅스마스터, 정보처리기사 등.)
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {["React", "Next.js", "TypeScript", "Python", "Linux", "MongoDB"].map(
            (skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-300"
              >
                {skill}
              </span>
            ),
          )}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-sm text-cyan-400">02 / PROJECTS</p>
        <h2 className="mt-3 text-3xl font-bold">My Projects</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project._id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:border-cyan-400/60"
            >
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-3 leading-6 text-zinc-400">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-4 text-sm">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    GitHub ↗
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="mt-6 text-zinc-400">
            아직 등록된 프로젝트가 없어.
          </p>
        )}
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-sm text-cyan-400">03 / CONTACT</p>
        <h2 className="mt-3 text-3xl font-bold">Let&apos;s connect.</h2>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-cyan-400 hover:underline"
        >
          GitHub ↗
        </a>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-7 text-center text-sm text-zinc-500">
        © 2026 Ryan. Built with Next.js and MongoDB.
      </footer>
    </main>
  );
}

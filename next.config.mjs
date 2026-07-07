/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 本地开发在外置硬盘(/Volumes/Backup)上跑,Next 的图片优化器缓存
    // 会间歇性写出截断/损坏的文件(例如 hero 图 w=1920 返回 4096B octet-stream),
    // 导致 <Image> 渲染成破图。dev 下绕过优化器、直接服务原图;
    // 生产环境(Vercel,文件系统可靠)仍保留完整优化。
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;

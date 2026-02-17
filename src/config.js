/**
 * Blog site configuration.
 * Users customize their blog through this file.
 */
export default {
    // [修改] 站点标题更新为 Blog
    title: 'Blog',
    description: 'A minimalist documentation blog — Write in Markdown, Publish in Style.',
    // Logo 路径，指向 public/logo.svg
    logo: '/logo.svg',

    theme: {
        primaryColor: '#197fe6',
        defaultMode: 'dark',
    },
    search: {
        enabled: true,
        placeholder: 'Search docs...',
    },

    socialLinks: [
        // { icon: 'public', link: 'https://docblog.dev' },
        { icon: 'G', link: 'https://github.com/git-hub-cc/Blog' },
    ]
}
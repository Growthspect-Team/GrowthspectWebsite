
export interface BlogPostHeader {
    id: string;
    text: string;
    level: number;
}

export const extractHeaders = (content: string): BlogPostHeader[] => {
    if (!content) return [];
    
    const lines = content.split('\n');
    const headers: BlogPostHeader[] = [];
    
    // We only care about ## headers based on existing code, but let's be robust
    // Existing code uses: content.split('\n\n') and checks startsWith('## ')
    // Let's stick to regex matching to find all headers in order to generate unique IDs
    
    const matches = content.match(/^## (.*$)/gm);
    if (!matches) return [];

    return matches.map((match, index) => ({
        id: `section-${index}`,
        text: match.replace('## ', ''),
        level: 2
    }));
};

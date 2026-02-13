
export interface BlogPostHeader {
    id: string;
    text: string;
    level: number;
}

export const extractHeaders = (content: string): BlogPostHeader[] => {
    if (!content) return [];
    
    // Match ## or ###, allowing optional leading whitespace
    const regex = /^\s*(#{2,3})\s+(.*)$/gm;
    const headers: BlogPostHeader[] = [];
    let match;
    let index = 0;

    while ((match = regex.exec(content)) !== null) {
        headers.push({
            id: `section-${index}`,
            text: match[2].trim(),
            level: match[1].length
        });
        index++;
    }

    return headers;
};

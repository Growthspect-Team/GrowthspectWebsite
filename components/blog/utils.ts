
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
        // Calculate line number by counting newlines up to the match index
        const lineNumber = content.substring(0, match.index).split('\n').length;
        
        headers.push({
            id: `header-L${lineNumber}`,
            text: match[2].trim().replace(/\*\*/g, '').replace(/^\*|\*$/g, ''),
            level: match[1].length
        });
        index++;
    }

    return headers;
};

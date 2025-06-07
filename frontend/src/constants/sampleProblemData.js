export const sampleStringProblem = {
  title: 'Check Palindrome',
  description:
    'Given a string, check whether it is a palindrome. A palindrome is a word, phrase, or sequence that reads the same backward as forward.',
  difficulty: 'EASY',
  tags: ['string', 'two-pointers', 'palindrome'],
  constraints: '1 ≤ length of string ≤ 10^5',
  hints: 'Use two pointers or reverse the string and compare it with the original.',
  editorial:
    'To check if a string is a palindrome, either reverse the string and compare it to the original, or use two pointers from both ends moving towards the center and comparing characters.',
  testcases: [
    {
      input: 'madam',
      output: 'true',
    },
    {
      input: 'apple',
      output: 'false',
    },
    {
      input: 'level',
      output: 'true',
    },
    {
      input: 'civic',
      output: 'true',
    },
    {
      input: 'rotator',
      output: 'true',
    },
  ],
  examples: [
    {
      input: 'racecar',
      output: 'true',
      explanation: '"racecar" reads the same forward and backward, so it is a palindrome.',
    },
    {
      input: 'hello',
      output: 'false',
      explanation: '"hello" is not a palindrome because it reads "olleh" backward.',
    },
  ],
  codeSnippets: {
    JAVASCRIPT: `const fs = require('fs');

function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}

const input = fs.readFileSync(0, 'utf-8').trim();
console.log(isPalindrome(input));`,
    PYTHON: `def is_palindrome(s):
    return s == s[::-1]

import sys
input_str = sys.stdin.read().strip()
print(str(is_palindrome(input_str)).lower())`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) return false;
            i++;
            j--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        System.out.println(isPalindrome(input));
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
console.log(input === input.split('').reverse().join(''));`,
    PYTHON: `import sys
input_str = sys.stdin.read().strip()
print(str(input_str == input_str[::-1]).lower())`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        String reversed = new StringBuilder(s).reverse().toString();
        System.out.println(s.equals(reversed));
    }
}`,
  },
};

export const sampleDPData = {
  title: 'Number of Islands',
  description:
    "You are given a 2D grid of '1's (land) and '0's (water). An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. Count the number of islands.\n\nInput Format:\n- The first line contains two integers, M and N, the number of rows and columns.\n- The next M lines each contain a string of length N consisting of '1's and '0's.\n\nOutput Format:\n- A single integer representing the total number of islands in the grid.",
  difficulty: 'MEDIUM',
  tags: ['Graph', 'Breadth-First Search'],
  constraints: '1 <= M, N <= 300',
  companies: ['Amazon', 'Google', 'Microsoft'],
  hints:
    'Use BFS or DFS to traverse each island and mark visited cells to avoid counting the same island multiple times.',
  editorial:
    "Iterate over each cell; when you find a '1', initiate a BFS/DFS to mark all connected lands as visited. Increase the island count by one each time a new '1' is found unvisited.",
  examples: [
    {
      input: '4 5\n11000\n11000\n00100\n00011',
      output: '3',
      explanation: 'There are three islands in the grid.',
    },
    {
      input: '3 3\n111\n010\n111',
      output: '1',
      explanation: "All '1's are connected as a single island.",
    },
    {
      input: '1 1\n0',
      output: '0',
      explanation: 'No land cells, so zero islands.',
    },
  ],
  testcases: [
    { input: '4 5\n11000\n11000\n00100\n00011', output: '3' },
    { input: '3 3\n111\n010\n111', output: '1' },
    { input: '1 1\n0', output: '0' },
    { input: '5 5\n11111\n10001\n10101\n10001\n11111', output: '1' },
    { input: '3 4\n1001\n0000\n1001', output: '4' },
    { input: '2 2\n11\n11', output: '1' },
    { input: '2 2\n10\n01', output: '2' },
    { input: '3 3\n000\n000\n000', output: '0' },
  ],
  codeSnippets: {
    JAVASCRIPT:
      "// Write your code here\nfunction solution(input) {\n  // your logic here\n\n}\n\n// Do not remove below lines\nconst input = require('fs').readFileSync(0, 'utf-8').trim();\nconsole.log(solution(input));",
    PYTHON:
      '# Write your code here\ndef solution(input):\n  # your logic here\n  pass\n\n# Do not remove below lines\nimport sys\ninput = sys.stdin.read().strip()\nprint(solution(input))',
    JAVA: '// Write your code here\nimport java.util.*;\n\npublic class Main {\n  public static int solution(String input) {\n    // your logic here\n    return 0;\n  }\n\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    StringBuilder sb = new StringBuilder();\n    int M = sc.nextInt();\n    int N = sc.nextInt();\n    sc.nextLine();\n    sb.append(M).append(" ").append(N).append("\\n");\n    for (int i = 0; i < M; i++) {\n      sb.append(sc.nextLine()).append("\\n");\n    }\n    return solution(sb.toString().trim());\n  }\n}',
  },
  referenceSolutions: {
    JAVASCRIPT:
      "function solution(input) {\n  const lines = input.split('\\n');\n  const [M, N] = lines[0].split(' ').map(Number);\n  const grid = lines.slice(1).map(line => line.split(''));\n\n  const visited = Array.from({ length: M }, () => Array(N).fill(false));\n  const directions = [[1,0], [-1,0], [0,1], [0,-1]];\n\n  let count = 0;\n\n  function bfs(r, c) {\n    const queue = [[r, c]];\n    visited[r][c] = true;\n\n    while (queue.length) {\n      const [x, y] = queue.shift();\n      for (const [dx, dy] of directions) {\n        const nx = x + dx, ny = y + dy;\n        if (nx >= 0 && nx < M && ny >= 0 && ny < N && !visited[nx][ny] && grid[nx][ny] === '1') {\n          visited[nx][ny] = true;\n          queue.push([nx, ny]);\n        }\n      }\n    }\n  }\n\n  for (let i = 0; i < M; i++) {\n    for (let j = 0; j < N; j++) {\n      if (grid[i][j] === '1' && !visited[i][j]) {\n        bfs(i, j);\n        count++;\n      }\n    }\n  }\n\n  return count.toString();\n}\n\nconst input = require('fs').readFileSync(0, 'utf-8').trim();\nconsole.log(solution(input));",
    PYTHON:
      "def solution(input):\n  lines = input.split('\\n')\n  M, N = map(int, lines[0].split())\n  grid = [list(line) for line in lines[1:]]\n\n  visited = [[False]*N for _ in range(M)]\n  directions = [(1,0), (-1,0), (0,1), (0,-1)]\n\n  def bfs(r, c):\n    queue = [(r, c)]\n    visited[r][c] = True\n\n    while queue:\n      x, y = queue.pop(0)\n      for dx, dy in directions:\n        nx, ny = x + dx, y + dy\n        if 0 <= nx < M and 0 <= ny < N and not visited[nx][ny] and grid[nx][ny] == '1':\n          visited[nx][ny] = True\n          queue.append((nx, ny))\n\n  count = 0\n  for i in range(M):\n    for j in range(N):\n      if grid[i][j] == '1' and not visited[i][j]:\n        bfs(i, j)\n        count += 1\n\n  return str(count)\n\nimport sys\ninput = sys.stdin.read().strip()\nprint(solution(input))",
    JAVA: 'import java.util.*;\n\npublic class Main {\n  public static int solution(String input) {\n    String[] lines = input.split("\\n");\n    String[] firstLine = lines[0].split(" ");\n    int M = Integer.parseInt(firstLine[0]);\n    int N = Integer.parseInt(firstLine[1]);\n\n    char[][] grid = new char[M][N];\n    for (int i = 0; i < M; i++) {\n      grid[i] = lines[i+1].toCharArray();\n    }\n\n    boolean[][] visited = new boolean[M][N];\n    int count = 0;\n\n    int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int i = 0; i < M; i++) {\n      for (int j = 0; j < N; j++) {\n        if (grid[i][j] == \'1\' && !visited[i][j]) {\n          bfs(grid, visited, i, j, M, N, directions);\n          count++;\n        }\n      }\n    }\n\n    return count;\n  }\n\n  private static void bfs(char[][] grid, boolean[][] visited, int r, int c, int M, int N, int[][] directions) {\n    Queue<int[]> queue = new LinkedList<>();\n    queue.offer(new int[]{r, c});\n    visited[r][c] = true;\n\n    while (!queue.isEmpty()) {\n      int[] curr = queue.poll();\n      for (int[] dir : directions) {\n        int nr = curr[0] + dir[0];\n        int nc = curr[1] + dir[1];\n        if (nr >= 0 && nr < M && nc >= 0 && nc < N && !visited[nr][nc] && grid[nr][nc] == \'1\') {\n          visited[nr][nc] = true;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int M = sc.nextInt();\n    int N = sc.nextInt();\n    sc.nextLine();\n    StringBuilder sb = new StringBuilder();\n    sb.append(M).append(" ").append(N).append("\\n");\n    for (int i = 0; i < M; i++) {\n      sb.append(sc.nextLine()).append("\\n");\n    }\n    System.out.println(solution(sb.toString().trim()));\n  }\n}',
  },
};

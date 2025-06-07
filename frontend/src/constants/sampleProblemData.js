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
  title: 'Minimum Platforms Required',
  description:
    'Given arrival and departure times of trains at a railway station in 24-hour format, find the minimum number of platforms required so that no train waits.\n\nInput Format:\n- A single line containing a space-separated list of arrival times.\n- The next line contains a space-separated list of departure times.\n\nOutput Format:\n- A single integer representing the minimum number of platforms required at the station.',
  difficulty: 'MEDIUM',
  tags: ['Greedy', 'Sorting'],
  constraints:
    '1 <= N <= 50000\n0000 <= arrival[i], departure[i] <= 2359\nTimes are valid and in 24-hour format without colon.',
  companies: ['Google', 'Microsoft', 'Amazon'],
  hints: 'Sort both arrival and departure arrays, then simulate platform usage with two pointers.',
  editorial:
    'Sort both arrays. Use two pointers to track how many trains are at the station at a time. Increase the platform count when a train arrives before another departs, and decrease it when one departs before the next arrival. Track the maximum platforms used.',
  examples: [
    {
      input: '0900 0940 0950 1100 1500 1800\n0910 1200 1120 1130 1900 2000',
      output: '3',
      explanation: 'Trains overlap between 0950 and 1200, requiring up to 3 platforms.',
    },
    {
      input: '0900 0930 1000\n0910 1005 1030',
      output: '2',
      explanation: 'Maximum 2 trains overlap at a time.',
    },
  ],
  testcases: [
    { input: '0900 0940 0950 1100 1500 1800\n0910 1200 1120 1130 1900 2000', output: '3' },
    { input: '0900 0930 1000\n0910 1005 1030', output: '2' },
    { input: '0900 0910 0920\n0930 0940 0950', output: '3' },
    { input: '1000 1010 1020 1030\n1015 1025 1035 1045', output: '2' },
    { input: '1234\n1235', output: '1' },
    { input: '0900 0915 0920 0930\n0935 0940 0950 1000', output: '4' },
    { input: '2300 2330\n2310 2340', output: '2' },
    { input: '0800 0810 0820 0830 0840 0850\n0815 0825 0835 0845 0855 0900', output: '2' },
  ],
  codeSnippets: {
    JAVASCRIPT:
      "// Write your code here\nfunction solution(input) {\n  // your logic here\n\n}\n\n// Do not remove below lines\nconst input = require('fs').readFileSync(0, 'utf-8').trim();\nconsole.log(solution(input));",
    PYTHON:
      '# Write your code here\ndef solution(input):\n  # your logic here\n  pass\n\n# Do not remove below lines\nimport sys\ninput = sys.stdin.read().strip()\nprint(solution(input))',
    JAVA: '// Write your code here\nimport java.util.*;\n\npublic class Main {\n  public static int solution(String input) {\n    // your logic here\n    return 0;\n  }\n\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    StringBuilder sb = new StringBuilder();\n    while (sc.hasNextLine()) {\n      sb.append(sc.nextLine()).append("\\n");\n    }\n    System.out.println(solution(sb.toString().trim()));\n  }\n}',
  },
  referenceSolutions: {
    JAVASCRIPT:
      "function solution(input) {\n  const [arrLine, depLine] = input.split('\\n');\n  const arrivals = arrLine.trim().split(' ').map(Number).sort((a, b) => a - b);\n  const departures = depLine.trim().split(' ').map(Number).sort((a, b) => a - b);\n\n  let platforms = 0, maxPlatforms = 0;\n  let i = 0, j = 0;\n  const n = arrivals.length;\n\n  while (i < n && j < n) {\n    if (arrivals[i] <= departures[j]) {\n      platforms++;\n      i++;\n      maxPlatforms = Math.max(maxPlatforms, platforms);\n    } else {\n      platforms--;\n      j++;\n    }\n  }\n\n  return maxPlatforms.toString();\n}\n\nconst input = require('fs').readFileSync(0, 'utf-8').trim();\nconsole.log(solution(input));",
    PYTHON:
      "def solution(input):\n  lines = input.split('\\n')\n  arrivals = sorted(list(map(int, lines[0].split())))\n  departures = sorted(list(map(int, lines[1].split())))\n\n  n = len(arrivals)\n  i = j = 0\n  platforms = max_platforms = 0\n\n  while i < n and j < n:\n    if arrivals[i] <= departures[j]:\n      platforms += 1\n      max_platforms = max(max_platforms, platforms)\n      i += 1\n    else:\n      platforms -= 1\n      j += 1\n\n  return str(max_platforms)\n\nimport sys\ninput = sys.stdin.read().strip()\nprint(solution(input))",
    JAVA: 'import java.util.*;\n\npublic class Main {\n  public static int solution(String input) {\n    String[] lines = input.split("\\n");\n    int[] arrivals = Arrays.stream(lines[0].trim().split(" ")).mapToInt(Integer::parseInt).toArray();\n    int[] departures = Arrays.stream(lines[1].trim().split(" ")).mapToInt(Integer::parseInt).toArray();\n\n    Arrays.sort(arrivals);\n    Arrays.sort(departures);\n\n    int i = 0, j = 0, platforms = 0, maxPlatforms = 0;\n    while (i < arrivals.length && j < departures.length) {\n      if (arrivals[i] <= departures[j]) {\n        platforms++;\n        maxPlatforms = Math.max(maxPlatforms, platforms);\n        i++;\n      } else {\n        platforms--;\n        j++;\n      }\n    }\n    return maxPlatforms;\n  }\n\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    StringBuilder sb = new StringBuilder();\n    while (sc.hasNextLine()) {\n      sb.append(sc.nextLine()).append("\\n");\n    }\n    System.out.println(solution(sb.toString().trim()));\n  }\n}',
  },
};

export const sampleDemoData = {
  title: 'Sum of Digits',
  description:
    'Given a number as input, return the sum of its digits.\n\nInput Format:\n- A single line containing a non-negative integer.\n\nOutput Format:\n- A single integer representing the sum of digits of the input number.',
  difficulty: 'EASY',
  tags: ['Math', 'String'],
  constraints: '0 <= number <= 10^18',
  companies: ['PayPal', 'Adobe', 'Microsoft', 'Google', 'Apple'],
  hints: 'Convert the number to a string and iterate through each digit.',
  editorial:
    'You can solve this by converting the number to a string and summing each digit, or by repeatedly using modulo and division operations.',
  examples: [
    {
      input: '12345',
      output: '15',
      explanation: '1+2+3+4+5 = 15',
    },
    {
      input: '987',
      output: '24',
      explanation: '9+8+7 = 24',
    },
  ],
  testcases: [
    { input: '12345', output: '15' },
    { input: '987', output: '24' },
    { input: '0', output: '0' },
    { input: '100000', output: '1' },
    { input: '99999', output: '45' },
    { input: '1111111111', output: '10' },
    { input: '8008', output: '16' },
    { input: '999999999999999999', output: '162' },
  ],
  codeSnippets: {
    JAVASCRIPT:
      "// Write your code here\nfunction solution(input) {\n  // Your logic\n  // Uncomment below line\n  // return [...input].reduce((sum, ch) => sum + Number(ch), 0);\n}\n\n// Do not remove below lines\nconst input = require('fs').readFileSync(0, 'utf-8').trim();\nconsole.log(solution(input));",

    PYTHON:
      '# Write your code here\ndef solution(input):\n  # Your logic\n  # Uncomment below line\n  # return sum(int(ch) for ch in input)\n\n# Do not remove below lines\nimport sys\ninput = sys.stdin.read().strip()\nprint(solution(input))',

    JAVA: "// Write your code here\nimport java.util.*;\n\npublic class Main {\n  public static int solution(String input) {\n    // Your logic\n    // Uncomment below line\n    // return input.chars().map(c -> c - '0').sum();\n  }\n\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String input = sc.nextLine();\n    System.out.println(solution(input));\n  }\n}",
  },
  referenceSolutions: {
    JAVASCRIPT:
      "function solution(input) {\n  return input.split('').reduce((sum, digit) => sum + Number(digit), 0);\n}\n\nconst input = require('fs').readFileSync(0, 'utf-8').trim();\nconsole.log(solution(input));",
    PYTHON:
      'def solution(input):\n  return sum(int(d) for d in input)\n\nimport sys\ninput = sys.stdin.read().strip()\nprint(solution(input))',
    JAVA: "import java.util.*;\n\npublic class Main {\n  public static int solution(String input) {\n    int sum = 0;\n    for (char ch : input.toCharArray()) {\n      sum += ch - '0';\n    }\n    return sum;\n  }\n\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String input = sc.nextLine();\n    System.out.println(solution(input));\n  }\n}",
  },
};

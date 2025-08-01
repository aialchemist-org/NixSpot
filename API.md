# NixSpot API Documentation

This document describes the API endpoints that Veonix CLI uses to interact with the NixSpot platform.

## Base URL
```
https://api.nixspot.dev/v1
```

## Authentication

All API requests require authentication using a personal access token:

```bash
Authorization: Bearer <your_token>
```

## Endpoints

### Repositories

#### List Repositories
```http
GET /repos
```

**Response:**
```json
{
  "repositories": [
    {
      "id": "repo_123",
      "name": "my-project",
      "description": "My awesome project",
      "private": false,
      "owner": "username",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-02T00:00:00Z",
      "language": "TypeScript",
      "stars": 42,
      "forks": 7,
      "web3_hash": "QmX1234..."
    }
  ]
}
```

#### Create Repository
```http
POST /repos
```

**Request Body:**
```json
{
  "name": "new-project",
  "description": "A new project",
  "private": false
}
```

#### Get Repository
```http
GET /repos/{repo_id}
```

#### Delete Repository
```http
DELETE /repos/{repo_id}
```

### Files

#### List Files
```http
GET /repos/{repo_id}/files
```

**Query Parameters:**
- `path` - Directory path (optional)
- `ref` - Branch/commit reference (default: main)

#### Get File Content
```http
GET /repos/{repo_id}/files/{file_path}
```

#### Upload File
```http
POST /repos/{repo_id}/files
```

**Request Body:**
```json
{
  "path": "src/index.ts",
  "content": "console.log('Hello World')",
  "message": "Add index file",
  "branch": "main"
}
```

### Pull Requests

#### List Pull Requests
```http
GET /repos/{repo_id}/pulls
```

#### Create Pull Request
```http
POST /repos/{repo_id}/pulls
```

**Request Body:**
```json
{
  "title": "Add new feature",
  "description": "This PR adds a new feature",
  "head": "feature-branch",
  "base": "main"
}
```

#### Get Pull Request
```http
GET /repos/{repo_id}/pulls/{pr_id}
```

### AI Features

#### AI Code Review
```http
POST /repos/{repo_id}/pulls/{pr_id}/ai-review
```

**Response:**
```json
{
  "score": 92,
  "suggestions": [
    {
      "line": 15,
      "type": "improvement",
      "message": "Consider adding error handling here"
    }
  ],
  "summary": "Overall good code quality with minor improvements needed"
}
```

#### AI Code Analysis
```http
POST /ai/analyze
```

**Request Body:**
```json
{
  "code": "function hello() { console.log('world'); }",
  "language": "javascript"
}
```

### Web3 Features

#### Verify Repository
```http
POST /repos/{repo_id}/web3/verify
```

**Response:**
```json
{
  "ipfs_hash": "QmX1234...",
  "signature": "0xabc123...",
  "verified": true
}
```

## Veonix CLI Integration

### Configuration

Create a `.veonixrc` file in your project root:

```json
{
  "remote": "https://api.nixspot.dev/v1",
  "token": "your_access_token",
  "repo_id": "repo_123"
}
```

### Common Commands

#### Initialize Repository
```bash
veonix init
```

#### Push Changes
```bash
veonix push -m "Commit message"
```

#### Pull Changes
```bash
veonix pull
```

#### Create Pull Request
```bash
veonix pr create -t "Title" -d "Description"
```

#### AI Code Review
```bash
veonix ai review
```

## Error Handling

All API endpoints return standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is invalid",
    "details": "Additional error details"
  }
}
```

## Rate Limiting

API requests are limited to:
- 5000 requests per hour for authenticated users
- 100 requests per hour for unauthenticated requests

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
X-RateLimit-Reset: 1640995200
```

## Webhooks

Configure webhooks to receive real-time notifications:

```http
POST /repos/{repo_id}/webhooks
```

**Request Body:**
```json
{
  "url": "https://your-app.com/webhook",
  "events": ["push", "pull_request", "issues"],
  "secret": "webhook_secret"
}
```

## SDK Examples

### JavaScript/Node.js
```javascript
const NixSpot = require('@nixspot/sdk');

const client = new NixSpot({
  token: 'your_token',
  baseURL: 'https://api.nixspot.dev/v1'
});

// List repositories
const repos = await client.repos.list();

// Create repository
const newRepo = await client.repos.create({
  name: 'my-project',
  description: 'My project'
});
```

### Python
```python
from nixspot import NixSpot

client = NixSpot(token='your_token')

# List repositories
repos = client.repos.list()

# AI code review
review = client.ai.review_code(
    code="def hello(): print('world')",
    language="python"
)
```

## Web3 and AI Feature Enhancements

NixSpot provides advanced Web3 and AI-powered features for enhanced code collaboration:

### Web3 Repository Verification
- Secure IPFS-based repository hash generation
- Wallet-based authentication for repositories
- Decentralized repository integrity verification

### AI-Powered Code Analysis
- Automated code quality scoring
- Intelligent suggestions and improvements
- Real-time security and performance insights

For more examples and detailed documentation, visit [https://docs.nixspot.dev](https://docs.nixspot.dev)

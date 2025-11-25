import { User } from "../types/user.types";

export class UserRepository {
  private users: User[] = [
    { id: "user1", username: "john_doe", email: "john@example.com", name: "John Doe", age: 30 },
    { id: "user2", username: "jane_smith", email: "jane@example.com", name: "Jane Smith", age: 25 },
  ];

  findAll(): User[] {
    return [...this.users];
  }

  findById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  findByUsername(username: string): User | undefined {
    return this.users.find(u => u.username === username);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  update(id: string, updated: Partial<User>): User | undefined {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    this.users[idx] = { ...this.users[idx], ...updated };
    return this.users[idx];
  }

  delete(id: string): boolean {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    this.users.splice(idx, 1);
    return true;
  }
}
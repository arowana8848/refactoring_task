import { User } from "../types/user.types";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

export class UserService {
  constructor(private repo: UserRepository) {}

  getAllUsers(): User[] {
    return this.repo.findAll();
  }

  getUserById(id: string): User | undefined {
    return this.repo.findById(id);
  }

  createUser(dto: CreateUserDto): { user?: User; error?: string } {
    if (this.repo.findById(dto.id)) return { error: "User ID already exists" };
    if (this.repo.findByEmail(dto.email)) return { error: "Email already exists" };
    if (this.repo.findByUsername(dto.username)) return { error: "Username already exists" };

    const user: User = { ...dto };
    return { user: this.repo.create(user) };
  }

  updateUser(id: string, dto: UpdateUserDto): { user?: User; error?: string } {
    const existing = this.repo.findById(id);
    if (!existing) return { error: "User not found" };
    // check duplicates excluding this id
    const emailOwner = this.repo.findByEmail(dto.email);
    if (emailOwner && emailOwner.id !== id) return { error: "Email already exists" };
    const usernameOwner = this.repo.findByUsername(dto.username);
    if (usernameOwner && usernameOwner.id !== id) return { error: "Username already exists" };

    const updated = this.repo.update(id, dto);
    return { user: updated! };
  }

  deleteUser(id: string): boolean {
    return this.repo.delete(id);
  }
}
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientService {
    create(createClientDto: CreateClientDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateClientDto: UpdateClientDto): string;
    remove(id: number): string;
}

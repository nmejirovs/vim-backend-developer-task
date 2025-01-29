import { ApiProperty } from "@nestjs/swagger";

export class ServerStatus {
    @ApiProperty()
    status: string;
}
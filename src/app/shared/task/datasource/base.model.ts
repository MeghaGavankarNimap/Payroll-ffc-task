export class BaseModel {
	// Edit
	_isEditMode: boolean = false;
	// Log
	_userId: number = 0; // Admin
	_createdDate: string | undefined;
	_updatedDate: string | undefined;
}
